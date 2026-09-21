const express = require("express");
const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const projectRouter = express.Router();

projectRouter.post(
    "/create",
    authMiddleware,
    roleMiddleware(["admin", "projectManager"]),
    createProject
);

projectRouter.get("/",authMiddleware,getProjects);

projectRouter.put("/:id",authMiddleware,roleMiddleware(["admin","projectManager"]),updateProject);

projectRouter.delete("/:id",authMiddleware,roleMiddleware(["admin","projectManager"]),deleteProject);

module.exports ={projectRouter};