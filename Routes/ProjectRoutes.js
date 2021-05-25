const express=require('express')
const router=express.Router()
const ProjectController=require('./../Controller/ProjectController')

router.post('/CreateProject',ProjectController.CreateNewProject)
router.get('/GetProjects',ProjectController.GetProject)
router.get('/GetProjectByName',ProjectController.GetProjectByName)

/* router.get('/GetAllProject')
router.get('/GetProject/:id') */
module.exports =router