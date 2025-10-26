import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import "@/styles/global.css";

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route element={<ProtectedRoutes />}>
				<Route element={<Layout />}>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/about" element={<About />} />
					<Route path="/dashboard/project" element={<Projects />} />
					<Route path="/dashboard/experience" element={<Experience />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
