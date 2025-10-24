import React from "react";
import { Add } from "@mui/icons-material";

const AddButton = ({ title, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center py-2 px-4 bg-white/10 rounded-lg shadow-lg backdrop-blur-lg ring-1 ring-white/30 hover:bg-black/10 hover:ring-white/10 transition-all">
			<Add />
			{title}
		</button>
	);
};

export default AddButton;
