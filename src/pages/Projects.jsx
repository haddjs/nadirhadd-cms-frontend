import React from "react";
import ProjectsCard from "@/components/common/ProjectsCard";

const Projects = () => {
	return (
		<div className="flex flex-col">
			<h1 className="font-bold text-white text-4xl">Projects</h1>
			<div>
				<ProjectsCard />
			</div>
		</div>
	);
};

export default Projects;
