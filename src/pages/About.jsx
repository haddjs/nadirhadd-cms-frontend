import React, { useState } from "react";
import AboutForm from "@/components/forms/AboutForm";
import { Snackbar } from "@mui/material";

const About = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snakbarMessage, setSnackbarMessage] = useState("");

	const handleShowSnackbar = (message) => {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbarOpen(false);
	};

	return (
		<div className="flex flex-col gap-8 text-white">
			<h1 className="font-bold text-4xl">About</h1>
			<div>
				<AboutForm onShowSnackbar={handleShowSnackbar} />
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={handleCloseSnackbar}
					message={snakbarMessage}
				/>
			</div>
		</div>
	);
};

export default About;
