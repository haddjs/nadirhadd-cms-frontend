import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

const ExperienceCard = ({ experience, onEdit, onDeleteExp }) => {
	const handleDeleteClick = () => {
		console.log("Deleting project with id:", experience.id);
		console.log("Object:", experience);
		onDeleteExp(experience.id);
	};

	return (
		<div className="flex flex-col gap-5 w-128 bg-white/10 px-6 py-4 rounded-lg ring-2 ring-white/25 shadow-lg backdrop-blur-md text-white">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold text-2xl">{experience.company_name}</h1>
				<Button variant="destructive" onClick={handleDeleteClick}>
					<Trash />
				</Button>
			</div>

			<p className="line-clamp-2">{experience.job_description}</p>
			<p>
				{experience.start_date.split("T")[0]} -{" "}
				{experience.end_date === null
					? "Current"
					: experience.end_date.split("T")[0]}
			</p>
			<div className="flex gap-4 py-3">
				{experience.experienceTech?.map((techStack) => (
					<div
						className="bg-white/20 py-2 px-5 rounded-lg"
						key={techStack.tech_id}>
						<p className="font-semibold">{techStack.technologies.name}</p>
					</div>
				))}
			</div>
			<Button onClick={() => onEdit(experience)} variant="glass">
				Details
			</Button>
		</div>
	);
};

export default ExperienceCard;
