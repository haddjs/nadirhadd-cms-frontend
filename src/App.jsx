import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import "@/styles/global.css";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/project" element={<Projects />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
