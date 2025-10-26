import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogContent,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import TechSelect from "./TechSelect";
import useTech from "@/hooks/useTech";

const ProjectModal = ({ isOpen, onClose, project, mode = "edit", onSave }) => {
	const [formData, setFormData] = useState({
		project_title: "",
		project_description: "",
		live_url: "",
		techStack: [],
		demoLink: "",
	});

	const [loading, setLoading] = useState(false);
	const { technologies, loading: techLoading, error: techError } = useTech();

	useEffect(() => {
		if (isOpen) {
			if (mode === "edit" && project) {
				setFormData({
					project_title: project.project_title || "",
					project_description: project.project_description || "",
					live_url: project.live_url || "",
					techStack:
						project.projectTech?.map((pt) => pt.technologies.name) || [],
				});
			} else {
				setFormData({
					project_title: "",
					project_description: "",
					live_url: "",
					techStack: [],
				});
			}
		}
	}, [isOpen, mode, project]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleTechStackChange = (newTechStack) => {
		setFormData((prev) => ({
			...prev,
			techStack: newTechStack,
		}));
	};

	const handleSave = async () => {
		if (!formData.project_title.trim()) {
			toast.error("Project title is required!");
			return;
		}

		if (!formData.project_description.trim()) {
			toast.error("Project description is required!");
			return;
		}
		setLoading(true);

		try {
			const projectData = {
				...formData,
				techStack: formData.techStack,
			};
			await onSave(projectData);
			toast.success(mode === "edit" ? "Project Updated!" : "Project Added!");
		} catch (error) {
			console.error("Error saving project", error);
			toast.error("Failed to save project");
		} finally {
			setLoading(false);
		}
	};

	if (mode === "edit" && (!project || !project.project_title)) {
		console.warn("Project data is missing in edit mode", project);
		return null;
	}

	const renderFormFields = () => (
		<div className="flex flex-col gap-7">
			<div className="flex flex-col gap-2">
				<label>Title *</label>
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
				<label className="font-medium">Technologies</label>
				{techLoading ? (
					<div className="text-white">Loading technologies...</div>
				) : techError ? (
					<div>Error loading suggestions.</div>
				) : (
					<TechSelect
						value={formData.techStack}
						onChange={handleTechStackChange}
						existingTechnologies={technologies}
					/>
				)}
			</div>
		</div>
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						{mode === "edit" ? (
							`Edit: ${project?.project_title}`
						) : (
							<p>Add New Project</p>
						)}
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col">{renderFormFields()}</div>
				<DialogFooter>
					<Button
						variant={"glass"}
						onClick={onClose}
						className="cursor-pointer"
						disabled={loading}>
						Cancel
					</Button>
					<Button
						variant="glass"
						onClick={handleSave}
						className="cursor-pointer">
						{loading ? "Saving..." : mode === "edit" ? "Update" : "Add"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectModal;
