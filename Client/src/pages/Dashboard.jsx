import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    let [projects, setProjects] = useState([]);
    let [tasks, setTasks] = useState([]);
    let [members, setMembers] = useState([]);

    let role = localStorage.getItem("role");

    useEffect(() => {

        let token = localStorage.getItem("token");

        axios.get("https://project-task-management-n9kv.onrender.com/api/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {

            if (res.data.status === 1) {
                setProjects(res.data.data);
            }

        })
        .catch((err) => console.log(err));

        axios.get("https://project-task-management-n9kv.onrender.com/api/tasks?page=1&limit=100", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {

            if (res.data.status === 1) {
                setTasks(res.data.data);
            }

        })
        .catch((err) => console.log(err));

        if (role === "admin" || role === "projectManager") {

            axios.get("https://project-task-management-n9kv.onrender.com/api/users/team-members", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {

                if (res.data.status === 1) {
                    setMembers(res.data.data);
                }

            })
            .catch((err) => console.log(err));

        }

    }, []);

    let todoTasks = tasks.filter((task) => task.status === "todo").length;
    let progressTasks = tasks.filter((task) => task.status === "in-progress").length;
    let completedTasks = tasks.filter((task) => task.status === "completed").length;

    let upcomingTasks = tasks
        .filter((task) => new Date(task.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-gray-500">Total Projects</h2>
                        <p className="text-3xl font-bold mt-2">
                            {projects.length}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-gray-500">Total Tasks</h2>
                        <p className="text-3xl font-bold mt-2">
                            {tasks.length}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-gray-500">Completed Tasks</h2>
                        <p className="text-3xl font-bold mt-2">
                            {completedTasks}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-gray-500">In Progress</h2>
                        <p className="text-3xl font-bold mt-2">
                            {progressTasks}
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-xl font-bold mb-5">
                            Project Progress
                        </h2>

                        {projects.map((project) => {

                            let projectTasks = tasks.filter(
                                (task) => String(task.project) === String(project._id)
                            );

                            let completed = projectTasks.filter(
                                (task) => task.status === "completed"
                            ).length;

                            let progress = projectTasks.length
                                ? Math.round((completed / projectTasks.length) * 100)
                                : 0;

                            return (
                                <div key={project._id} className="mb-5">

                                    <div className="flex justify-between mb-1">
                                        <span>{project.name}</span>
                                        <span>{progress}%</span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded h-3">
                                        <div
                                            className="bg-blue-600 h-3 rounded"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>

                                </div>
                            );

                        })}

                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-xl font-bold mb-5">
                            Task Status
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Todo</span>
                                <span className="font-bold">
                                    {todoTasks}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>In Progress</span>
                                <span className="font-bold">
                                    {progressTasks}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Completed</span>
                                <span className="font-bold">
                                    {completedTasks}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-xl font-bold mb-5">
                            Upcoming Deadlines
                        </h2>

                        {upcomingTasks.length === 0 ? (
                            <p>No upcoming deadlines</p>
                        ) : (
                            upcomingTasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="border-b py-3"
                                >
                                    <p className="font-semibold">
                                        {task.title}
                                    </p>

                                    <p className="text-gray-500">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}

                    </div>

                    {(role === "admin" || role === "projectManager") && (

                        <div className="bg-white p-6 rounded-lg shadow">

                            <h2 className="text-xl font-bold mb-5">
                                Team Performance Overview
                            </h2>

                            {members.map((member) => {

                                let memberTasks = tasks.filter(
                                    (task) => String(task.assignedTo) === String(member._id)
                                );

                                let completed = memberTasks.filter(
                                    (task) => task.status === "completed"
                                ).length;

                                return (
                                    <div
                                        key={member._id}
                                        className="border-b py-3"
                                    >
                                        <p className="font-semibold">
                                            {member.name}
                                        </p>

                                        <p className="text-gray-500">
                                            Assigned: {memberTasks.length}
                                            {" | "}
                                            Completed: {completed}
                                        </p>
                                    </div>
                                );

                            })}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;