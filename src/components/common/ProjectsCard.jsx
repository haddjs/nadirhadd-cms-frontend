import React from "react";
import { Button } from "../ui/button";

const ProjectsCard = ({ project, onViewDetails }) => {
	const stack = [
		{
			id: 1,
			stackName: "React.js",
		},
		{
			id: 2,
			stackName: "Next.js",
		},
		{
			id: 3,
			stackName: "Node.js",
		},
	];
	return (
		<div className="flex flex-col gap-5 w-96 bg-white/10 px-6 py-4 rounded-lg ring-2 ring-white/25 shadow-lg backdrop-blur-md text-white">
			<h1 className="font-semibold text-2xl">{project.project_title}</h1>
			<h1 className="line-clamp-2">{project.project_description}</h1>
			<div className="flex gap-4 py-3">
				{stack.map((techStack) => (
					<div className="bg-white/20 py-2 px-5 rounded-lg" key={techStack.id}>
						<h1 className="font-semibold">{techStack.stackName}</h1>
					</div>
				))}
			</div>
			<Button onClick={() => onViewDetails(project)} variant="glass">
				Details
			</Button>
		</div>
	);
};

export default ProjectsCard;
