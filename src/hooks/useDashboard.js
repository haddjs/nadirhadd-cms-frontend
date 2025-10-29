import { useState, useEffect } from "react";
import useProject from "./useProject";
import useExperience from "./useExperience";
import useTech from "./useTech";

const useDashboard = () => {
	const { projects } = useProject();
	const { experiences } = useExperience();
	const { technologies } = useTech();

	const [stats, setStats] = useState({
		projects: 0,
		experiences: 0,
		technologies: 0,
		recentActivities: [],
	});

	useEffect(() => {
		if (projects && experiences && technologies) {
			setStats({
				projects: projects.length,
				experiences: experiences.length,
				technologies: experiences.length,
				recentActivities: generateRecentActivities(projects, experiences),
			});
		}
	}, [projects, experiences, technologies]);

	const generateRecentActivities = (projects, experiences) => {
		const activities = [];

		projects.slice(0, 3).forEach((project) => {
			activities.push({
				type: "project",
				title: project.project_title,
				date: new Date().toISOString(),
				action: "created",
			});
		});

		experiences.slice(0, 3).forEach((exp) => {
			activities.push({
				type: "experience",
				title: `${exp.job_title} at ${exp.company_name}`,
				date: new Date().toISOString(),
				action: "added",
			});
		});

		return activities
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 5);
	};

	return stats;
};

export default useDashboard;
