import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    let navigate = useNavigate();


    let handleLogin = (e) => {

        e.preventDefault();

        setError("");

        axios.post("https://project-task-management-n9kv.onrender.com/api/users/login", {
            email: email,
            password: password
        })
            .then((res) => {

                console.log(res.data);

                if (res.data.status === 1) {

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("role", res.data.user.role);

                    navigate("/dashboard");

                } else {

                    setError(res.data.msg);

                }

            })
            .catch((err) => {

                console.log(err);
                setError("Something went wrong");

            });

    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center text-slate-800">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Login to your account
                </p>

                {error && (
                    <div className="border border-red-300 bg-red-50 text-red-600 p-4 rounded-lg mt-6 text-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="mt-8">

                    <label className="block mb-2 font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-lg p-3 mb-5 outline-none focus:border-blue-500"
                    />

                    <label className="block mb-2 font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-lg p-3 mb-6 outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <Link to="/register" className="text-blue-600 block text-center mt-4">
                        Create an account
                    </Link>

                </form>

            </div>

        </div>
    );
};

export default Login;