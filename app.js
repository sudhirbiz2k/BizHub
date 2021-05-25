const express=require('express')
require('dotenv').config({path:'./config.env'})
const app=express()
const mongoose=require('mongoose')
const Project = require('./Models/ProjectModel')
const ProjectRouter=require('./Routes/ProjectRoutes')
const TaskRouter=require('./Routes/TaskRoutes')
app.use(express.json())
require('dotenv').config()
mongoose.connect(process.env.DATABASE,{    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,}).then(()=>{
    console.log("Connection established by DB")
},err=>{console.log("Unsuccessful",err)})


app.use('/',ProjectRouter)
app.use('/',TaskRouter)




app.listen(8000,()=>{
    console.log(('Running on port 8000')); 
})