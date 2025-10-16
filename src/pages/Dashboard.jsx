import React from "react";
import { Card, CardContent } from "@mui/material";

const Dashboard = () => {
	return (
		<div>
			<Card className="w-64">
				<CardContent className="bg-red-300/40 backdrop-blur-xl shadow-2xl">
					Projects
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
