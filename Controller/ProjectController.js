const User = require('../Models/UserModel')
const Project =require('./../Models/ProjectModel')
const nodemailer=require('nodemailer')

exports.CreateNewProject=async(req,res)=>{

    try{
    const project=await Project.create(
        {...req.body,ProjectCreatedBy:req.user.id,ProjectAdmin:req.user.id}

    )
        console.log(project.ProjectMembers)
    for(var i=0;i<project.ProjectMembers.length;i++){
        var user=await User.findOne({Email:project.ProjectMembers[i]})
        console.log(user)
        if(user){
           await User.findOneAndUpdate({Email:user.Email},{$push:{MyProjects:project._id}})
        }
    } 
    
    await User.findByIdAndUpdate({_id:project.ProjectAdmin},{$push:{MyProjects:project._id}})
    var transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'CourseQuery2021@gmail.com',
            pass:'Course#2021'
        }
 
    })
    const mailOptions = {
     from: 'BizHub <CourseQuery2021@gmail.com>', // sender address
     to: project.ProjectMembers,// list of receivers
     subject: 'Subject of your email', // Subject line
     html: 'You Have Been Assigned a Project'// plain text body
   };
   transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
  res.status(201).json({
    success:true,
    project
})
}catch(err){
    res.json({
        success:false,
        Error:err
    })
}

    
   
}
exports.GetProject=async(req,res)=>{
    const project=await Project.find().populate('Tasks')
    res.json(project)
}
exports.GetProjectByName=async(req,res)=>{
    try{
    const project=await Project.findOne({ProjectTitle:req.body.ProjectTitle}).populate('Tasks','TaskTitle TaskDescription').populate('ProjectAdmin','Username Email').populate('ProjectMembers','Username Email')
    if(project){
    res.status(200).json({
        success:true,
        project
    })
}else{
    res.status(404).json({
        success:false,
        message:"Cant Find Project"
    })
}
    }catch(err){
        res.status(404).json({
            success:false,
            message:"Not Found Project"

        })
    }
}
exports.checkProject=async(req,res)=>{
    const project=await Project.findOne({ProjectTitle:req.body.ProjectTitle})
    if(project){
        res.json({success:false})
    }else{
        res.json({success:true})
    }
}
exports.DeleteProject=async(req,res)=>{
    const checkProject=await Project.findOne({ProjectTitle:req.body.ProjectTitle})
    if(checkProject){
        await Project.findOneAndDelete({ProjectTitle:req.body.ProjectTitle})
        res.json({
            success:true,
            message:'Deleted Successfully'
        })

    }
    else{
        res.json({
            success:false
        })
    }


}
exports.GetProjectMembers=async(req,res)=>{
    const FindProject=await Project.findOne({ProjectTitle:req.body.ProjectTitle})
 
   
}
