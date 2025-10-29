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

const ExperienceModal = ({
	isOpen,
	onClose,
	experience,
	mode = "edit",
	onSave,
}) => {
	const [formData, setFormData] = useState({
		company_name: "",
		job_title: "",
		job_description: "",
		start_date: "",
		end_date: "",
		techStack: [],
	});

	const [isCurrent, setIsCurrent] = useState(false);
	const [loading, setLoading] = useState(false);
	const { technologies, loading: techLoading, error: techError } = useTech();

	useEffect(() => {
		if (isOpen) {
			if (mode === "edit" && experience) {
				const startDate = experience.start_date
					? new Date(experience.start_date).toISOString().split("T")[0]
					: "";
				const endDate = experience.end_date
					? new Date(experience.end_date).toISOString().split("T")[0]
					: "";
				setFormData({
					company_name: experience.company_name || "",
					job_title: experience.job_title || "",
					job_description: experience.job_description || "",
					start_date: startDate,
					end_date: endDate,
					techStack:
						experience.experienceTech?.map((et) => et.technologies.name) || [],
				});
			} else {
				setFormData({
					company_name: "",
					job_title: "",
					job_description: "",
					start_date: "",
					end_date: "",
					techStack: [],
				});
			}
		}
	}, [isOpen, mode, experience]);

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

	const handleCurrentJobChange = (e) => {
		const checked = e.target.checked;
		setIsCurrent(checked);
		setFormData((prev) => ({
			...prev,
			end_date: checked ? null : "",
		}));
	};

	const handleSave = async () => {
		if (!formData.company_name.trim()) {
			toast.error("Company name is required!");
			return;
		}

		if (!formData.job_title.trim()) {
			toast.error("Job title is required!");
			return;
		}

		if (!formData.start_date.trim()) {
			toast.error("Start date is required!");
			return;
		}

		setLoading(true);

		try {
			const expData = {
				...formData,
				start_date: new Date(formData.start_date).toISOString(),
				end_date: isCurrent
					? null
					: formData.end_date
					? new Date(formData.end_date).toISOString()
					: null,
				techStack: formData.techStack,
			};
			await onSave(expData);
			toast.success(
				mode === "edit" ? "Experience Updated!" : "Experience Added!"
			);
		} catch (error) {
			console.error("Error saving experienec", error);
			toast.error("Failed to save experience");
		} finally {
			setLoading(false);
		}
	};

	if (mode === "edit" && (!experience || !experience.company_name)) {
		console.warn("Project data is missing in edit mode", experience);
		return null;
	}

	const renderFormFields = () => (
		<div className="flex flex-col gap-7">
			<div className="flex flex-col gap-2">
				<label>Company Name *</label>
				<input
					type="text"
					name="company_name"
					value={formData.company_name}
					onChange={handleInputChange}
					className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
					required
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label>Job Title *</label>
				<input
					type="text"
					name="job_title"
					value={formData.job_title}
					onChange={handleInputChange}
					className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
					required
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label>Job Description</label>
				<Textarea
					type="text"
					name="job_description"
					value={formData.job_description}
					onChange={handleInputChange}
					className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
					required
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<label>Start Date *</label>
					<input
						type="date"
						name="start_date"
						value={formData.start_date}
						onChange={handleInputChange}
						className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
						required
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label>End Date</label>
					{isCurrent ? (
						<div className="text-white">Currently Work Here</div>
					) : (
						<input
							type="date"
							name="end_date"
							value={formData.end_date}
							onChange={handleInputChange}
							className="ring-1 ring-white/20 rounded-md shadow-lg p-2 outline-0 focus:ring-2 focus:ring-white/40 transition-all"
							max={new Date().toISOString().split("T")[0]}
						/>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<input
					type="checkbox"
					id="currentJob"
					checked={isCurrent}
					onChange={handleCurrentJobChange}
					className="w-4 h-4 rounded focus:ring-2 focus:ring-white/40"
				/>
				<label htmlFor="currentJob">I currently work here</label>
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
							`Edit: ${experience?.company_name}`
						) : (
							<p>Add New Experience</p>
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

export default ExperienceModal;
