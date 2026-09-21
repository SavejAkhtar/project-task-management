const express = require("express");

const { createTask, getTasks, updateTask, deleteTask, getMyTasks, updateTaskStatus, searchTasks } = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const taskRouter = express.Router();

taskRouter.post("/create",authMiddleware,roleMiddleware(["admin", "projectManager"]),createTask);

taskRouter.get("/",authMiddleware,getTasks);

taskRouter.get("/search",authMiddleware,searchTasks);

taskRouter.put("/:id",authMiddleware,roleMiddleware(["admin","projectManager"]),updateTask);

taskRouter.delete("/:id",authMiddleware,roleMiddleware(["admin","projectManager"]),deleteTask);

taskRouter.get("/myTask",authMiddleware,roleMiddleware(["teamMember"]),getMyTasks);

taskRouter.put("/:id/status",authMiddleware,roleMiddleware(["teamMember"]),updateTaskStatus);


module.exports = taskRouter;