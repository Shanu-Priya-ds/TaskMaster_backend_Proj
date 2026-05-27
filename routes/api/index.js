const router = require("express").Router();
const projRoutes = require("./projectRoutes");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");


router.use("/project", projRoutes);
router.use("/task", taskRoutes);
router.use("/user", userRoutes);

module.exports = router;