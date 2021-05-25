const Task=require('./../Models/TaskModel')
const Project =require('../Models/ProjectModel')

exports.CreateTask=async(req,res)=>{
    const options={
        TaskTitle:req.body.TaskTitle,
        TaskDescription:req.body.TaskDescription,
        ProjectTitle:req.body.ProjectTitle
    }
    task=await Task.create(options)
    
    console.log(task)
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
exports.GetTaskByProject=async(req,res)=>{}
exports.DeleteTask=async(req,res)=>{

}