const router = require("express").Router();

//1. POST /api/projects/:projectId/tasks
//Create a new task for a specific project.
// Before creating the task, you must verify that the logged-in user owns the project specified by :projectId.

//2. GET /api/projects/:projectId/tasks
//Get all tasks for a specific project. This also requires an ownership check on the parent project.



//3. PUT /api/tasks/:taskId:
//Find the task by :taskId.
//From the task, find its parent project.
//Verify that the logged-in user owns that parent project.

//4. DELETE /api/tasks/:taskId: Delete a single task. 
// This requires the same complex authorization check as the update route.

module.exports = router;