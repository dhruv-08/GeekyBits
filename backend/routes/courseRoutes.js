const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const courseController=require(`${__dirname}/../controllers/courseController`);
router.use(authController.protect);
router.route('/')
.get(courseController.getCourses)
.post(courseController.createCourse);
router.route('/:courseId')
.get(courseController.getCourseById)
.post(courseController.enrollCourse);

module.exports=router;