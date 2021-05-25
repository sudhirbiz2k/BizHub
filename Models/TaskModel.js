const mongoose=require('mongoose')


const TaskSchema=new mongoose.Schema({

    TaskTitle:String,
    TaskDescription:String,
    ProjectTitle:String
    

})

const Task=mongoose.model('Task',TaskSchema)
module.exports=Task