import React from "react";
import DashboardCard from "@/components/common/DashboardCard";
import useDashboard from "../hooks/useDashboard";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";

const Dashboard = () => {
	const { projects, experiences, technologies, recentActivities } =
		useDashboard();

	const getActivityIcon = (type, action) => {
		if (action === "created" || action === "added")
			return <Plus className="h-4 w-4" />;
		if (action === "updated") return <Edit className="h-4 w-4" />;
		if (action === "deleted") return <Trash2 className="h-4 w-4" />;
	};

	const getActivityColor = (type) => {
		switch (type) {
			case "project":
				return "bg-blue-400/20";
			case "experience":
				return "bg-green-400/20";
			default:
				return "bg-gray-400/20";
		}
	};

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="font-bold text-white text-4xl">Dashboard</h1>
			</div>
			<div className="flex gap-5">
				<DashboardCard
					color={"black"}
					title={"Projects"}
					text={projects.toString()}
				/>
				<DashboardCard
					color={"white"}
					title={"Experience"}
					text={experiences.toString()}
				/>
				<DashboardCard
					color={"white"}
					title={"Tags"}
					text={technologies.toString()}
				/>
			</div>
			<div className="flex flex-col gap-6">
				<h1 className="font-semibold text-2xl text-white">Recent Activities</h1>

				{recentActivities.length > 0 ? (
					<div className="space-y-4 bg-white/20 backdrop-blur-md rounded-lg ring-2 ring-white/25 shadow-lg p-5">
						{recentActivities.map((activity, index) => (
							<div
								key={index}
								className={`flex item-center p-3 ${getActivityColor(
									activity.type
								)} rounded-lg`}>
								<div className="flex items-center p-3 text-white">
									{getActivityIcon(activity.type, activity.action)}
								</div>
								<div className="flex flex-col flex-1">
									<p className="text-white">
										<span>{activity.type}</span> <span>{activity.title}</span>{" "}
										was {activity.action}
									</p>
									<div className="flex items-center">
										{new Date(activity.date).toLocaleDateString()}
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8">
						<p>No recent activities</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
