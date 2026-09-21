const Task = require("../models/Task");
const AuditLog = require("../models/AuditLog");

const createTask = (req, res) => {

    let { title, description, project, assignedTo, priority, dueDate } = req.body;

    if (!title || !description || !project || !assignedTo || !priority || !dueDate) {
        return res.send({
            status: 0,
            msg: "All fields are required"
        });
    }

    let data = new Task({
        title: title,
        description: description,
        project: project,
        assignedTo: assignedTo,
        priority: priority,
        dueDate: dueDate
    });

    data.save().then((task) => {

        let log = new AuditLog({
            user: req.user.id,
            action: "CREATE",
            entity: "Task",
            entityId: task._id
        })

        log.save().then(() => {
            res.send({ status: 1, msg: "Task created successfully" });

        })
    })


        .catch((err) => {
            res.send({ status: 0, msg: "Task not created", error: err });

        });
};

const getTasks = (req, res) => {

    let { page, limit, status, priority } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    let skip = (page - 1) * limit;

    let filter = {};

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    Task.find(filter)
        .skip(skip)
        .limit(limit)
        .then((tasks) => {

            res.send({
                status: 1, msg: "Tasks get successfully", page: page,
                limit: limit, data: tasks
            });

        })
        .catch((err) => {
            res.send({ status: 0, msg: "Tasks not get", error: err });
        });
};

const getMyTasks = (req, res) => {

    Task.find({ assignedTo: req.user.id }).then((tasks) => {

        res.send({ status: 1, msg: "My tasks get successfully", data: tasks });

    })
        .catch((err) => {
            res.send({ status: 0, msg: "My tasks not get", error: err });

        });
};

const searchTasks = (req, res) => {

    let { keyword } = req.query;

    Task.find({
        title: {
            $regex: keyword,
            $options: "i"
        }
    }).then((tasks) => {

        res.send({ status: 1, msg: "Tasks searched successfully", data: tasks });

    })
        .catch((err) => {

            res.send({ status: 0, msg: "Tasks not searched", error: err });

        });
};

const updateTaskStatus = (req, res) => {

    let { id } = req.params;
    let { status } = req.body;

    Task.findOne({
        _id: id,
        assignedTo: req.user.id
    }).then((task) => {

        if (!task) {
            return res.send({ status: 0, msg: "Task not found or task is not assigned to you" });
        }

        Task.updateOne(
            { _id: id },
            { $set: { status: status } }
        )
            .then(() => {

                let log = new AuditLog({
                    user: req.user.id,
                    action: "UPDATE",
                    entity: "Task",
                    entityId: id
                });

                log.save();

                res.send({ status: 1, msg: "Task status updated successfully" });

            })
            .catch((err) => {

                res.send({ status: 0, msg: "Task status not updated", error: err });

            });

    })
        .catch((err) => {

            res.send({ status: 0, msg: "Task not found", error: err });

        });
};

const updateTask = (req, res) => {

    let { id } = req.params;
    let { title, description, project, assignedTo, status, priority, dueDate } = req.body;

    Task.updateOne(
        { _id: id },
        {
            $set: {
                title: title,
                description: description,
                project: project,
                assignedTo: assignedTo,
                status: status,
                priority: priority,
                dueDate: dueDate
            }
        }
    ).then((result) => {

        if (result.matchedCount === 0) {
            return res.send({
                status: 0,
                msg: "Task not found"
            });
        }

        res.send({
            status: 1,
            msg: "Task updated successfully"
        });

    }).catch((err) => {

        res.send({
            status: 0,
            msg: "Task not updated",
            error: err
        });

    });
};

const deleteTask = (req, res) => {

    let { id } = req.params;

    Task.deleteOne({ _id: id }).then((result) => {

        if (result.deletedCount === 0) {
            return res.send({ status: 0, msg: "Task not found" });
        }

        res.send({ status: 1, msg: "Task deleted successfully" });

        let log = new AuditLog({
            user: req.user.id,
            action: "DELETE",
            entity: "Task",
            entityId: id
        });

        log.save();
    })
        .catch((err) => {

            res.send({ status: 0, msg: "Task not deleted", error: err });

        });
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getMyTasks, updateTaskStatus, searchTasks };