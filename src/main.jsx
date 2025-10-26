import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ProjectProvider } from "./context/ProjectProvider.jsx";
import "@/index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ProjectProvider>
					<App />
				</ProjectProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
