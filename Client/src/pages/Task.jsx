import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Tasks = () => {

    let [tasks, setTasks] = useState([]);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [project, setProject] = useState("");
    let [assignedTo, setAssignedTo] = useState("");
    let [priority, setPriority] = useState("medium");
    let [dueDate, setDueDate] = useState("");
    let [members, setMembers] = useState([]);
    let [projects, setProjects] = useState([]);

    let role = localStorage.getItem("role");

    let [editId, setEditId] = useState("");

    let createTask = (e) => {

        e.preventDefault();

        if (!title || !description || !project || !assignedTo || !dueDate) {
            alert("Please fill all fields");
            return;
        }

        let token = localStorage.getItem("token");

        axios.post("https://project-task-management-n9kv.onrender.com/api/tasks/create", {
            title: title,
            description: description,
            project: project,
            assignedTo: assignedTo,
            priority: priority,
            dueDate: dueDate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {

                    setTitle("");
                    setDescription("");
                    setProject("");
                    setAssignedTo("");
                    setPriority("medium");
                    setDueDate("");

                    axios.get("https://project-task-management-n9kv.onrender.com/api/tasks?page=1&limit=20", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => {

                            if (res.data.status === 1) {
                                setTasks(res.data.data);
                            }

                        });

                } else {

                    alert(res.data.msg);

                }

            })
            .catch((err) => {

                console.log(err);

            });
    };

    let editTask = (task) => {

        setEditId(task._id);
        setTitle(task.title);
        setDescription(task.description);
        setProject(task.project);
        setAssignedTo(task.assignedTo);
        setPriority(task.priority);
        setDueDate(task.dueDate.slice(0, 10));

    };

    let updateTask = (e) => {

        e.preventDefault();

        let token = localStorage.getItem("token");

        let oldTask = tasks.find((task) => task._id === editId);

        axios.put(`https://project-task-management-n9kv.onrender.com/api/tasks/${editId}`, {
            title: title,
            description: description,
            project: project,
            assignedTo: assignedTo,
            status: oldTask.status,
            priority: priority,
            dueDate: dueDate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {

                    setTasks((oldTasks) =>
                        oldTasks.map((task) =>
                            task._id === editId
                                ? {
                                    ...task,
                                    title: title,
                                    description: description,
                                    priority: priority,
                                    dueDate: dueDate
                                }
                                : task
                        )
                    );

                    setEditId("");
                    setTitle("");
                    setDescription("");
                    setProject("");
                    setAssignedTo("");
                    setPriority("medium");
                    setDueDate("");

                } else {

                    alert(res.data.msg);

                }

            })
            .catch((err) => {

                console.log(err);

            });
    };

    let cancelEdit = () => {

        setEditId("");
        setTitle("");
        setDescription("");
        setProject("");
        setAssignedTo("");
        setPriority("medium");
        setDueDate("");

    };

    let deleteTask = (id) => {

        let token = localStorage.getItem("token");

        let check = confirm("Are you sure you want to delete this task?");

        if (!check) {
            return;
        }

        axios.delete(`https://project-task-management-n9kv.onrender.com/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {

                    setTasks((oldTasks) =>
                        oldTasks.filter((task) => task._id !== id)
                    );

                } else {

                    alert(res.data.msg);

                }

            })
            .catch((err) => {

                console.log(err);

            });
    };

    let getMyTasks = () => {

        let token = localStorage.getItem("token");

        axios.get("https://project-task-management-n9kv.onrender.com/api/tasks/myTask", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {
                    setTasks(res.data.data);
                } else {
                    alert(res.data.msg);
                }

            })
            .catch((err) => {

                console.log(err);

            });
    };

    let updateStatus = (id, status) => {

        let token = localStorage.getItem("token");

        axios.put(`https://project-task-management-n9kv.onrender.com/api/tasks/${id}/status`, {
            status: status
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {

                    setTasks((oldTasks) =>
                        oldTasks.map((task) =>
                            task._id === id
                                ? { ...task, status: status }
                                : task
                        )
                    );

                } else {

                    alert(res.data.msg);

                }

            })
            .catch((err) => {

                console.log(err);

            });
    };

    useEffect(() => {

        let token = localStorage.getItem("token");

        if (role === "teamMember") {

            axios.get("https://project-task-management-n9kv.onrender.com/api/tasks/myTask", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {

                    console.log(res.data);

                    if (res.data.status === 1) {
                        setTasks(res.data.data);
                    }

                })
                .catch((err) => {

                    console.log(err);

                });

        } else {

            axios.get("https://project-task-management-n9kv.onrender.com/api/tasks?page=1&limit=20", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {

                    console.log(res.data);

                    if (res.data.status === 1) {
                        setTasks(res.data.data);
                    }

                })
                .catch((err) => {

                    console.log(err);

                });

        }

        if (role === "admin" || role === "projectManager") {

            axios.get("https://project-task-management-n9kv.onrender.com/api/users/team-members", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {

                    console.log(res.data);

                    if (res.data.status === 1) {
                        setMembers(res.data.data);
                    }

                })
                .catch((err) => {

                    console.log(err);

                });

        }

        axios.get("https://project-task-management-n9kv.onrender.com/api/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {
                    setProjects(res.data.data);
                }

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Tasks
                </h1>

                {role === "teamMember" && (
                    <button
                        onClick={getMyTasks}
                        className="bg-slate-900 text-white px-4 py-2 rounded mt-4"
                    >
                        My Tasks
                    </button>
                )}

                {(role === "admin" || role === "projectManager") && (

                    <form
                        onSubmit={editId ? updateTask : createTask}
                        className="bg-white p-5 rounded-lg border mt-6"
                    >

                        <input
                            type="text"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 rounded w-full mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 rounded w-full mb-3"
                        />

                        <select
                            value={project}
                            onChange={(e) => setProject(e.target.value)}

                            className="border p-2 rounded w-full mb-3"
                        >
                            <option value="">Select Project</option>

                            {projects.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}

                        </select>

                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}

                            className="border p-2 rounded w-full mb-3"
                        >
                            <option value="">Select Team Member</option>

                            {members.map((member) => (
                                <option key={member._id} value={member._id}>
                                    {member.name}
                                </option>
                            ))}

                        </select>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="border p-2 rounded w-full mb-3"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="border p-2 rounded w-full mb-3"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {editId ? "Update Task" : "Create Task"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="bg-gray-600 text-white px-4 py-2 rounded ml-2"
                            >
                                Cancel
                            </button>
                        )}

                    </form>

                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

                    {tasks.map((task) => (

                        <div
                            key={task._id}
                            className="bg-white p-5 rounded-lg border"
                        >

                            <h2 className="text-xl font-semibold">
                                {task.title}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {task.description}
                            </p>

                            <p className="mt-4">
                                Status: {task.status}
                            </p>

                            {role === "teamMember" && (
                                <select
                                    value={task.status}
                                    onChange={(e) => updateStatus(task._id, e.target.value)}
                                    className="border p-2 rounded mt-3"
                                >
                                    <option value="todo">Todo</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            )}

                            <p className="mt-2">
                                Priority: {task.priority}
                            </p>

                            <p className="mt-2">
                                Due Date: {task.dueDate}
                            </p>

                            {(role === "admin" || role === "projectManager") && (
                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() => editTask(task)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Tasks;