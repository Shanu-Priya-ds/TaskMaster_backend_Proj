const router = require("express").Router();
const { Project, Task } = require("../../models");
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

// POST /api/project - Create a new project
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/project - Get all projects owned by the current user
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/project/:id - Get a single project by ID (with ownership check)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "You don't have permission to view this project" });
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/project/:id - Update a project (with ownership check)
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "You don't have permission to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, description: req.body.description },
      { new: true }
    );

    res.json(updatedProject);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id - Delete a project (with ownership check)
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "You don't have permission to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// POST /api/projects/:projectId/tasks - Create a new task for a project
router.post("/:projectId/tasks", async (req, res) => {
  try {
    const ownership = await checkProjectOwnership(req.params.projectId, req.user._id);
    if (!ownership.valid) {
      return res.status(403).json({ message: ownership.message });
    }

    const task = await Task.create({
      ...req.body,
      project: req.params.projectId
    });

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/projects/:projectId/tasks - Get all tasks for a project
router.get("/:projectId/tasks", async (req, res) => {
  try {
    const ownership = await checkProjectOwnership(req.params.projectId, req.user._id);
    if (!ownership.valid) {
      return res.status(403).json({ message: ownership.message });
    }

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
