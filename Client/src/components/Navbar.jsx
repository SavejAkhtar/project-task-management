import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
                Task Manager
            </h2>

            <div className="flex gap-6">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/projects">
                    Projects
                </Link>

                <Link to="/tasks">
                    Tasks
                </Link>

            </div>

            <button
    onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }}
    className="bg-red-600 px-3 py-1 rounded"
>
    Logout
</button>

        </div>
    );
};

export default Navbar;