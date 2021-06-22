const Task=require('./../Models/TaskModel')
const Project =require('../Models/ProjectModel')
const User = require('../Models/UserModel')

exports.CreateTask=async(req,res)=>{
    
    const options={
        TaskTitle:req.body.TaskTitle,
        TaskDescription:req.body.TaskDescription,
        ProjectTitle:req.body.ProjectTitle,
        AssignedBy:req.user.id,
        AssignedTo:req.body.AssignedTo,
        DeadLine:req.body.DeadLine
       
    }
    const task=await Task.create(options)
    for(var i=0;i<task.AssignedTo.length;i++){
        await User.findOneAndUpdate({Email:task.AssignedTo[i]},{$push:{MyTasks:task._id}})
    }
    await User.findByIdAndUpdate({_id:task.AssignedBy},{$push:{AssignedByMe:task._id}})
   
    const project=await Project.findOneAndUpdate({ProjectTitle:options.ProjectTitle},{$push:{Tasks:task._id}})
    res.status(201).json({
        success:true,
        task,
        project
    })
}
exports.GetTask=async(req,res)=>{
    const tasks=await Task.find()
    res.status(200).json({
        tasks
    })
}
exports.GetTaskByProjectName=async(req,res)=>{
    try{
    const tasks=await Task.find({ProjectTitle:req.body.ProjectTitle})
    if(tasks){
        res.status(200).json({
            tasks
        })
    }else{
        res.status(404).json({
            success:true,
            message:"Not Found"
        })
    }
    }catch(err){
        console.log(err)
    }
}
exports.UpdateTaskStatus=async(req,res)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body)
    res.json({success:true,task})
}
exports.EditTask=async(req,res)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body)
    res.json({success:true,task})
}
exports.DeleteTask=async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    console.log('it')
    res.json({success:true})
}
exports.DoneTask=async(req,res)=>{
    try{
    console.log('Hit')
    await Task.findByIdAndUpdate(req.params.id,{TaskStatus:'Compeleted'})
    await Project.findOneAndUpdate({ProjectTitle:req.body.ProjectTitle},{$pull:{'Tasks':req.params.id}})

    res.json({success:true})
    }catch(err){
        res.json({
            success:false,
            message:err
        })
    }
}
exports.OverdueTask=async(req,res)=>{
    await Task.findByIdAndUpdate(req.params.id,{TaskStatus:'Overdue'})
    res.json({success:true})
}