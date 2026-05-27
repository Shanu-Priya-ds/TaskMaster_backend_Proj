const router = require("express").Router();
const { Task, Project } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

// Protect all routes with auth middleware
router.use(authMiddleware);

// Helper function to check project ownership
const checkProjectOwnership = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) return { valid: false, message: "Project not found" };
  if (project.user.toString() !== userId) {
    return { valid: false, message: "You don't have permission to access this project" };
  }
  return { valid: true, project };
};

// PUT /api/tasks/:taskId - Update a task (with project ownership check)
router.put("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const ownership = await checkProjectOwnership(task.project, req.user._id);
    if (!ownership.valid) {
      return res.status(403).json({ message: ownership.message });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/tasks/:taskId - Delete a task (with project ownership check)
router.delete("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const ownership = await checkProjectOwnership(task.project, req.user._id);
    if (!ownership.valid) {
      return res.status(403).json({ message: ownership.message });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
