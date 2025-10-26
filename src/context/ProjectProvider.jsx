import React, { useState, useEffect, useCallback } from "react";
import projectServices from "../services/projectServices";
import { ProjectContext } from "./ProjectContext";

export const ProjectProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchProjects = useCallback(async () => {
		try {
			setLoading(true);
			const data = await projectServices.getProjects();
			setProjects(data);
			setError(null);
		} catch (error) {
			setError(error.message || "Failed to fetch projects");
		} finally {
			setLoading(false);
		}
	}, []);

	const addProject = useCallback(async (projectData) => {
		try {
			const newProject = await projectServices.addProject(projectData);
			setProjects((prev) => [...prev, newProject]);
			return newProject;
		} catch (error) {
			setError(error.message || "Failed to add project");
			throw error;
		}
	}, []);

	const updateProject = useCallback(async (id, projectData) => {
		try {
			const updatedProject = await projectServices.updateProject(
				id,
				projectData
			);
			setProjects((prev) =>
				prev.map((project) => (project.id === id ? updatedProject : project))
			);
			return updatedProject;
		} catch (error) {
			setError(error.message || "Failed to update project");
			throw error;
		}
	}, []);

	const deleteProject = useCallback(async (id) => {
		try {
			await projectServices.deleteProject(id);
			setProjects((prev) => prev.filter((p) => p.id !== id));
		} catch (error) {
			setError(error.message || "Failed to delete project");
			throw error;
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const value = {
		projects,
		loading,
		error,
		fetchProjects,
		addProject,
		updateProject,
		deleteProject,
	};

	return (
		<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
	);
};
