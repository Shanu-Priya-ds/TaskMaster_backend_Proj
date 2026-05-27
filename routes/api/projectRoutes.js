const router = require("express").Router();



//All routes in this file must be protected by your authentication middleware. Only a logged-in user can perform any action on projects.

 /**
  * 1. POST /api/projects: 
  * Create a new project. 
  * The owner’s ID must be taken from the req.user object (provided by the auth middleware) and saved with the new project.
  */
 
 /**
  * GET /api/projects: 
  * Get all projects owned by the currently logged-in user.
  */
 router.get("/",(req, res)=>{
    res.send("test route success");
 })
 
 /**
  * GET /api/projects/:id:
  *  Get a single project by its ID.
  *  This must be protected by an ownership check—a user can only get a project they own.
  */

 /**
 * PUT /api/projects/:id: 
 * Update a project. Also protected by an ownership check.
 */

 module.exports = router;