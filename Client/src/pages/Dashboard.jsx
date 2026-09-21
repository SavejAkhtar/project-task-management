import React, { useEffect, useState } from "react";
import axios from "axios"
import Navbar from "../components/Navbar";


const Dashboard = () => {

    let [projects, setProjects] = useState([])

    let [tasks, setTasks] = useState([]);

    useEffect(() => {

        let token = localStorage.getItem("token");

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

        axios.get("https://project-task-management-n9kv.onrender.com/api/tasks", {
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

    }, []);

    return (
            

        <div className="min-h-screen bg-slate-100 ">

            <Navbar/>

            <h1 className="text-3xl font-bold text-slate-800">
                Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
                Manage your projects and tasks
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">

                <div className="bg-white p-5 rounded-lg border">
                    <p className="text-gray-500">Projects</p>
                    <h2 className="text-3xl font-bold mt-2">{projects.length}</h2>
                </div>

                <div className="bg-white p-5 rounded-lg border">
                    <p className="text-gray-500">Tasks</p>
                    <h2 className="text-3xl font-bold mt-2">{tasks.length}</h2>
                </div>

                <div className="bg-white p-5 rounded-lg border">
                    <p className="text-gray-500">Completed</p>
                    <h2 className="text-3xl font-bold mt-2">{tasks.filter((task) => task.status === "completed").length}</h2>
                </div>

            </div>

            <div className="bg-white mt-6 p-6 rounded-lg border">

                <h2 className="text-xl font-semibold">
                    Recent Tasks
                </h2>

                <div className="mt-5 space-y-3">

                    {tasks.map((task) => (

                        <div className="flex justify-between border-b pb-3" key={task._id}>

                            <span>{task.title}</span>

                            <span>{task.status}</span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;