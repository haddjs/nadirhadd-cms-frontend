import { useState } from "react";
import ExperienceCard from "../components/common/ExperienceCard";
import ExperienceModal from "../components/forms/ExperienceModal";
import ConfirmModal from "../components/common/ConfirmModal";
import AddButton from "@/components/common/AddButton";
import useExperience from "../hooks/useExperience";
import { toast } from "sonner";

const Experience = () => {
	const {
		experiences,
		loading,
		error,
		addExperience,
		updateExperience,
		deleteExperience,
	} = useExperience();

	const [selectedExp, setSelectedExp] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("edit");
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [expToDelete, setExpToDelete] = useState(null);

	const handleOpenConfirm = (experienceId) => {
		setExpToDelete(experienceId);
		setIsConfirmOpen(true);
	};

	const handleCloseConfirm = () => {
		setIsConfirmOpen(false);
		setExpToDelete(null);
	};

	const handleConfirmDelete = async () => {
		if (expToDelete) {
			try {
				await deleteExperience(expToDelete);
				handleCloseConfirm();
				toast.success("Experience deleted!");
			} catch (error) {
				console.error("Error deleting experience", error);
				toast.error("Failed to delete experience.", error.message);
			}
		}
	};

	const handleEditExp = (experience) => {
		setSelectedExp(experience);
		setModalMode("edit");
		setIsModalOpen(true);
	};

	const handleAddExp = () => {
		setSelectedExp(null);
		setModalMode("add");
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedExp(null);
	};

	const handleSaveExperience = async (experienceData) => {
		try {
			if (modalMode === "add") {
				await addExperience(experienceData);
				toast.success("Experience added!");
			} else {
				await updateExperience(selectedExp.id, experienceData);
				toast.success("Experience updated!");
			}
			handleCloseModal();
		} catch (error) {
			console.error("Error saving experience", error);
			toast.error("Failed to save experience.", error.message);
		}
	};

	if (loading) return <div>Loading experience...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between text-white">
				<h1 className="font-bold text-4xl">Experience</h1>
				<AddButton title={"Add Experience"} onClick={handleAddExp} />
			</div>
			<div className="flex gap-5">
				{experiences.map((exp) => (
					<ExperienceCard
						key={exp.id}
						experience={exp}
						onEdit={handleEditExp}
						onDeleteExp={handleOpenConfirm}
					/>
				))}
			</div>

			<ExperienceModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				experience={selectedExp}
				mode={modalMode}
				onSave={handleSaveExperience}
			/>

			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={handleCloseConfirm}
				onClick={handleConfirmDelete}
			/>
		</div>
	);
};

export default Experience;
