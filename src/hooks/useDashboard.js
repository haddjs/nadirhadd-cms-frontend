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
	});
};

export default useDashboard;
