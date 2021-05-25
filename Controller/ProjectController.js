const Project =require('./../Models/ProjectModel')


exports.CreateNewProject=async(req,res)=>{
    const project=await Project.create(
        req.body
    )
    res.status(201).json({
        success:true,
        project
    })
}
exports.GetProject=async(req,res)=>{
    const project=await Project.find().populate('Tasks')
    res.json(project)
}
exports.GetProjectByName=async(req,res)=>{
    try{
    const project=await Project.findOne({ProjectTitle:req.body.ProjectTitle})
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