import React from "react";
import DashboardCard from "@/components/common/DashboardCard";

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="font-bold text-white text-4xl">Dashboard</h1>
			</div>
			<div className="flex gap-5">
				<DashboardCard color={"black"} title={"Projects"} text={"0"} />
				<DashboardCard color={"white"} title={"Experience"} text={"0"} />
				<DashboardCard color={"white"} title={"Tags"} text={"9"} />
			</div>
			<div>
				<h1 className="font-semibold text-2xl text-white">Recent Activities</h1>
			</div>
		</div>
	);
};

export default Dashboard;
