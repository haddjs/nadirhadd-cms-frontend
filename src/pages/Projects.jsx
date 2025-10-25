import { useState } from "react";
import ProjectsCard from "@/components/common/ProjectsCard";
import ProjectModal from "@/components/forms/ProjectModal";
import AddButton from "@/components/common/AddButton";

const PROJECT_DATA = [
	{
		id: 1,
		project_title: "E-Commerce Platform",
		shortDescription: "A full-stack e-commerce solution",
		project_description:
			"A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, and payment integration.",
		fullDescription:
			"A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, and payment integration. Built with modern web technologies for optimal performance and user experience.",
		image: "https://picsum.photos/seed/picsum/200/300",
		technologies: ["React", "Node.js", "MongoDB"],
		live_url: "https://demo.example.com",
		githubLink: "https://github.com/username/project",
	},
	{
		id: 2,
		project_title: "E-Sport Platform",
		shortDescription: "Gaming and esports tournament platform",
		project_description:
			"A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, and payment integration.",
		fullDescription:
			"A platform for organizing and participating in esports tournaments with real-time match tracking and player statistics.",
		image: "https://picsum.photos/seed/picsum/200/299",
		technologies: ["Next.js", "TypeScript", "PostgreSQL"],
		live_url: "https://demo.example.com",
		githubLink: "https://github.com/username/esport",
	},
];

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("view");

	const handleViewDetails = (project) => {
		setSelectedProject(project);
		setModalMode("view");
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

	const handleSaveProject = (projectData) => {
		console.log("Save project:".projectData);
		handleCloseModal();
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between text-white">
				<h1 className="font-bold text-4xl">Projects</h1>
				<AddButton title={"Add Project"} onClick={handleAddProject} />
			</div>
			<div className="flex gap-5">
				{PROJECT_DATA.map((project) => (
					<ProjectsCard
						key={project.id}
						project={project}
						onViewDetails={handleViewDetails}
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
		</div>
	);
};

export default Projects;
