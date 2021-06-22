const express=require('express')
require('dotenv').config({path:'./config.env'})
const app=express()
const passport=require('passport')
const mongoose=require('mongoose')
const Project = require('./Models/ProjectModel')
const ProjectRouter=require('./Routes/ProjectRoutes')
const TaskRouter=require('./Routes/TaskRoutes')
const UserRouter=require('./Routes/UserRoutes')
const passportSetup=require('./passport/passport-setup')(app,passport)
const cors=require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
mongoose.connect(process.env.DATABASE,{    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,}).then(()=>{
    console.log("Connection established by DB")
},err=>{console.log("Unsuccessful",err)})


app.use('/project',ProjectRouter)
app.use('/task',TaskRouter)
app.use('/user',UserRouter)




app.listen(8000,()=>{
    console.log(('Running on port 8000')); 
})