import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

const ProjectsCard = ({ project, onEdit, onDeleteProject }) => {
	const handleDeleteClick = () => {
		console.log("Deleting project with id:", project.id);
		console.log("Object:", project);
		onDeleteProject(project.id);
	};

	return (
		<div className="flex flex-col gap-5 w-128 bg-white/10 px-6 py-4 rounded-lg ring-2 ring-white/25 shadow-lg backdrop-blur-md text-white">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold text-2xl">{project.project_title}</h1>
				<Button variant="destructive" onClick={handleDeleteClick}>
					<Trash />
				</Button>
			</div>

			<p className="line-clamp-2">{project.project_description}</p>
			<div className="flex gap-4 py-3">
				{project.projectTech?.map((techStack) => (
					<div
						className="bg-white/20 py-2 px-5 rounded-lg"
						key={techStack.tech_id}>
						<p className="font-semibold">{techStack.technologies.name}</p>
					</div>
				))}
			</div>
			<Button onClick={() => onEdit(project)} variant="glass">
				Details
			</Button>
		</div>
	);
};

export default ProjectsCard;
