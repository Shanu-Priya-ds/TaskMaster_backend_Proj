const router = require("express").Router();
const projRoutes = require("./projectRoutes");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/users", userRoutes);
router.use("/projects", projRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;