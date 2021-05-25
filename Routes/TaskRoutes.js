const router=require('express').Router()
const TaskController=require('./../Controller/TaskController')

router.post('/CreateTask',TaskController.CreateTask)
router.get('/GetAllTasks',TaskController.GetTask)

module.exports =router