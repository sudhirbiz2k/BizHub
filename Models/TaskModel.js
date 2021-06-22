const mongoose=require('mongoose')


const TaskSchema=new mongoose.Schema({

    TaskTitle:String,
    TaskDescription:String,
    ProjectTitle:String,
    AssignedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    AssignedTo:Array,
    DateCreated:{type:Date,default:Date.now},
    DeadLine:{type:Date},
    TaskStatus:{type:String,enum:['Compeleted','Pending','Overdue'],default:'Pending'}

})

const Task=mongoose.model('Task',TaskSchema)
module.exports=Task