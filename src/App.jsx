import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import "@/styles/global.css";

function App() {
	return (
		<div>
			<Sidebar />
		</div>
	);
}

export default App;
