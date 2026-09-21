import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Task";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";


const App = () => {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                <Route path="/projects" element={
                    <ProtectedRoute>
                        <Projects />
                    </ProtectedRoute>
                } />

                <Route path="/tasks" element={
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/login" />} />

            </Routes>

        </BrowserRouter>
    );
};

export default App;