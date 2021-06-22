const router=require('express').Router()
const UserController=require('./../Controller/UserController')

router.post('/SignUp',UserController.SignUp)
router.post('/Login',UserController.LogIn)
router.post('/ForgotPassword',UserController.forgotpassword)
router.get('/GetMe',UserController.protectroute,UserController.GetMe)
router.post('/SubmitCode',UserController.checkCode)
module.exports=router