const User=require('./../Models/UserModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Project = require('../Models/ProjectModel')
const nodemailer=require('nodemailer')





exports.SignUp=async(req,res)=>{

    var user=await User.findOne({Email:req.body.Email})
    if(user){
        res.json({
            success:false,
            message:'User already exists'
        })
    }else{
    user=await User.create(req.body)
    
    const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'60d'})
    res.status(201).json({
        success:true,
        user,
        token

    })
}
}
exports.LogIn=async(req,res)=>{
    console.log("HIT")
    const user=await User.findOne({Email:req.body.email})

    if(!user){
    res.json({
            success:false,
            message:'NO USER FOUND!'
        })

    }
    if(user && user.google_id){
        return res.json({
            success:false,
            message:'Already have an account'
        })
    }
    const password=req.body.password

    const auth=await user.checkPassword(password,user.Password)
    if(!auth ){
        return res.json({
            success:false,
            message:'incorrect Email Or Password'
        })
    }
    const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'60d'})
    res.json({
        success:true,
        token
    })
   
    
}
exports.GetMe=async(req,res)=>{
    let date=new Date()
    
    const user=await  User.findById(req.user.id)
    .populate({path:'MyProjects',populate:{path:'ProjectAdmin',model:'User',select:'Username Email '},populate:{path:'Tasks', model:'Task',select:"TaskTitle DateCreated ProjectTitle DeadLine TaskStatus"}})
    .populate({path:'MyTasks'})
    .populate({path:'AssignedByMe',populate:{path:'AssignedBy',model:'User',select:'Username Email'}})
    res.json(user)
}
exports.protectroute=async(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]
    const decodedID=await jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decodedID.id)
    req.user=user

    next()

}
var pass=''
var email=''
exports.forgotpassword=async(req,res)=>{
    email=req.body.Email

    const keypass=Math.random().toString(36).substring(2,6).toUpperCase()
    pass=keypass
    var transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'CourseQuery2021@gmail.com',
            pass:'Course#2021'
        }
 
    })
    const mailOptions = {
     from: 'BizHub <CourseQuery2021@gmail.com>', // sender address
     to: req.body.Email,// list of receivers
     subject: 'Subject of your email', // Subject line
     html: `<h1>Your Code is</h1><br><h1 style={border:1px solid black}>${pass}</h1>`// plain text body
   };
   transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
     
       console.log(info);
  });
  res.json({success:true,message:'sent'})

}
exports.checkCode=async(req,res)=>{
    if(pass===req.body.Code){
        const newpassword=await bcrypt.hash(req.body.Password,12)
        await User.findOneAndUpdate({Email:email},{Password:newpassword})
        res.json({
            success:true
        })
    }else{
        res.json({success:false,message:"Incorrect Code"})
    }

}