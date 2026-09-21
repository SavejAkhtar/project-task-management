import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let navigate = useNavigate();

    let handleRegister = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register", {
            name: name,
            email: email,
            password: password
        })
        .then((res) => {

            console.log(res.data);

            if (res.data.status === 1) {
                alert("Registration successful");
                navigate("/login");
            } else {
                alert(res.data.msg);
            }

        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-lg w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded w-full"
                >
                    Register
                </button>

            </form>

        </div>
    );
};

export default Register;