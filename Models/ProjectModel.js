const mongoose =require('mongoose')
const Task=require('./TaskModel')

const ProjectSchema=new mongoose.Schema({
    ProjectTitle:{type:String,unique:[true,"This Title is Already Taken"]},
    ProjectDesc:String,
    ProjectType:{type:String,enum:{values:['Group','Individual'],message:`{VALUE} is not supported`}},
    ProjectAdmin:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    ProjectMembers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    Tasks:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}],
    DateCreated:{type:Date,default:Date.now}

})

const Project=mongoose.model('Project',ProjectSchema)

module.exports=Project