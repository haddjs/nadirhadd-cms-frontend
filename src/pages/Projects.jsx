import { useState } from "react";
import ProjectsCard from "@/components/common/ProjectsCard";
import ProjectModal from "@/components/forms/ProjectModal";
import ConfirmModal from "../components/common/ConfirmModal";
import AddButton from "@/components/common/AddButton";
import useProject from "../hooks/useProject";
import { toast } from "sonner";

const testAuth = () => {
	const token = localStorage.getItem("token");
	console.log("Auth Token:", token);
	console.log("Token exist", !!token);

	if (!token) {
		console.log("No token found, redirecting to login.");
	}
};

const Projects = () => {
	const { projects, loading, error, addProject, updateProject, deleteProject } =
		useProject();

	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("edit");
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [projectToDelete, setProjectToDelete] = useState(null);

	const handleOpenConfirm = (projectId) => {
		setProjectToDelete(projectId);
		setIsConfirmOpen(true);
	};

	const handleCloseConfirm = () => {
		setIsConfirmOpen(false);
		setProjectToDelete(null);
	};

	const handleConfirmDelete = async () => {
		if (projectToDelete) {
			try {
				await deleteProject(projectToDelete);
				handleCloseConfirm();
				toast.success("Project deleted!");
			} catch (error) {
				console.error("Error deleting project", error);
				toast.error("Failed to delete project.", error.message);
			}
		}
	};

	const handleEditProject = (project) => {
		setSelectedProject(project);
		setModalMode("edit");
		setIsModalOpen(true);
	};

	const handleAddProject = () => {
		setSelectedProject(null);
		setModalMode("add");
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProject(null);
	};

	const handleSaveProject = async (projectData) => {
		try {
			if (modalMode === "add") {
				await addProject(projectData);
				toast.success("Project added!");
			} else {
				await updateProject(selectedProject.id, projectData);
				toast.success("Project updated!");
			}
			handleCloseModal();
		} catch (error) {
			console.error("Error saving project", error);
			toast.error("Failed to save project.", error.message);
		}
	};

	if (loading) return <div>Loading projects...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between text-white">
				<h1 className="font-bold text-4xl">Projects</h1>
				<AddButton title={"Add Project"} onClick={handleAddProject} />
			</div>
			<div className="flex gap-5">
				{projects.map((project) => (
					<ProjectsCard
						key={project.id}
						project={project}
						onEdit={handleEditProject}
						onDeleteProject={handleOpenConfirm}
					/>
				))}
			</div>

			<ProjectModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				project={selectedProject}
				mode={modalMode}
				onSave={handleSaveProject}
			/>

			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={handleCloseConfirm}
				onClick={handleConfirmDelete}
			/>
		</div>
	);
};

testAuth();

export default Projects;
