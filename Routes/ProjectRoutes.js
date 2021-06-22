const express=require('express')
const router=express.Router()
const ProjectController=require('./../Controller/ProjectController')
const UserController=require('./../Controller/UserController')

router.post('/CreateProject',UserController.protectroute,ProjectController.CreateNewProject)
router.get('/GetProjects',ProjectController.GetProject)
router.get('/GetProjectByName',ProjectController.GetProjectByName)
router.post('/CheckProject',UserController.protectroute,ProjectController.checkProject)
router.post('/DeleteProject',UserController.protectroute,ProjectController.DeleteProject)

/* router.get('/GetAllProject')
router.get('/GetProject/:id') */
module.exports =router