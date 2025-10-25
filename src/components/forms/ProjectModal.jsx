import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogDescription,
	DialogContent,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const ProjectModal = ({ isOpen, onClose, project, mode = "view", onSave }) => {
	const [formData, setFormData] = useState({
		project_title: "",
		shortDescription: "",
		project_description: "",
		live_url: "",
		image: "",
		technologies: "",
		demoLink: "",
		githubLink: "",
	});

	useEffect(() => {
		if (mode === "view" && project) {
			setFormData({
				project_title: project.project_title || "",
				shortDescription: project.shortDescription || "",
				project_description: project.project_description || "",
				live_url: project.live_url || "",
				image: project.image || "",
				technologies: project.technologies || "",
				githubLink: project.githubLink || "",
			});
		} else if (mode === "add") {
			setFormData({
				project_title: "",
				shortDescription: "",
				project_description: "",
				live_url: "",
				image: "",
				technologies: "",
				githubLink: "",
			});
		}
	}, [isOpen, mode, project]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = () => {
		const projectData = {
			...formData,
		};
		onSave(projectData);
	};

	if (mode === "view" && !project) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						{mode === "view" ? (
							project?.project_title
						) : (
							<h3>Add New Project</h3>
						)}
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col">
					{mode === "view" ? (
						<div className="flex flex-col gap-7">
							<div className="flex flex-col gap-2">
								<label>Title</label>
								<input
									type="text"
									name="project_title"
									value={formData.project_title}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Description</label>
								<Textarea
									type="text"
									name="project_description"
									value={formData.project_description}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Live URL</label>
								<input
									type="text"
									name="live_url"
									value={formData.live_url}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Images</label>
								<img
									src={formData.image}
									alt={formData.image}
									width={50}
									height={50}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Technologies</label>
								<select name="technologies">
									{project.technologies.map((tech, i) => (
										<option value={tech} key={i}>
											{tech}
										</option>
									))}
								</select>
							</div>

							<div className="flex flex-col gap-2">
								<label>GitHub Link</label>
								<Textarea
									type="text"
									name="githubLink"
									value={formData.githubLink}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-7">
							<div className="flex flex-col gap-2">
								<label>Title</label>
								<input
									type="text"
									name="project_title"
									value={formData.project_title}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Description</label>
								<Textarea
									type="text"
									name="project_description"
									value={formData.project_description}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Live URL</label>
								<input
									type="text"
									name="live_url"
									value={formData.live_url}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Images</label>
								<img src={formData.image} alt={formData.image} />
							</div>

							<div className="flex flex-col gap-2">
								<label>Technologies</label>
								<input
									type="text"
									name="technologies"
									value={formData.technologies}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>GitHub Link</label>
								<Textarea
									type="text"
									name="githubLink"
									value={formData.githubLink}
									onChange={handleInputChange}
									className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
									required
								/>
							</div>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button variant="glass" onClick={onClose} className="cursor-pointer">
						Cancel
					</Button>
					<Button
						variant="glass"
						onClick={handleSave}
						className="cursor-pointer">
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectModal;
