import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Projects = () => {

    let [projects, setProjects] = useState([]);

    let [name, setName] = useState("");

    let [description, setDescription] = useState("");

    let [editId, setEditId] = useState("");

    let role = localStorage.getItem("role");

    let createProject = (e) => {

        e.preventDefault();

        let token = localStorage.getItem("token");

        axios.post("http://localhost:8000/api/projects/create", {
            name: name,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                setName("");
                setDescription("");

            })
            .catch((err) => {

                console.log(err);

            });
    };

    let editProject = (project) => {

        setEditId(project._id);
        setName(project.name);
        setDescription(project.description);

    };

    let updateProject = (e) => {

        e.preventDefault();

        let token = localStorage.getItem("token");

        axios.put(`http://localhost:8000/api/projects/${editId}`, {
            name: name,
            description: description,
            status: "active"
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                setEditId("");
                setName("");
                setDescription("");

                window.location.reload();

            })
            .catch((err) => {

                console.log(err);

            });
    };

    let deleteProject = (id) => {

        let token = localStorage.getItem("token");

        axios.delete(`http://localhost:8000/api/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);

                window.location.reload();

            })
            .catch((err) => {

                console.log(err);

            });
    };

    useEffect(() => {

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8000/api/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);
                setProjects(res.data.data);

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
                    Projects
                </h1>

                {(role === "admin" || role === "projectManager") && (
                <form onSubmit={editId ? updateProject : createProject} className="bg-white p-5 rounded-lg border mt-6">

                    <input
                        type="text"
                        placeholder="Project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Project description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded w-full mb-3"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {editId ? "Update Project" : "Create Project"}
                    </button>

                </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

                    {projects.map((project) => (

                        <div key={project._id} className="bg-white p-5 rounded-lg border">

                            <h2 className="text-xl font-semibold">
                                {project.name}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {project.description}
                            </p>

                            <p className="mt-4">
                                Status: {project.status}
                            </p>

                        {(role === "admin" || role === "projectManager") && (
                         <div>
                            <button
                                onClick={() => editProject(project)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteProject(project._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded mt-4 ml-2"
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

export default Projects;