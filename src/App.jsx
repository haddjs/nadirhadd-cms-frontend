import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import "@/styles/global.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<Layout />}>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/about" element={<About />} />
					<Route path="/dashboard/project" element={<Projects />} />
					<Route path="/dashboard/experience" element={<Experience />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
