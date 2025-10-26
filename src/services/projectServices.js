import api from "./api";

const projectServices = {
	getProjects: async () => {
		try {
			const response = await api.get("/api/projects");
			return response.data;
		} catch (error) {
			console.error("Error fetching projects:", error);
			throw error;
		}
	},

	getProjectsById: async (id) => {
		try {
			const response = await api.get(`/api/projects/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching project by :${id}`, error);
			throw error;
		}
	},

	addProject: async (projectData) => {
		try {
			const response = await api.post("/api/projects", projectData);
			return response.data;
		} catch (error) {
			console.error("Error adding project:", error);
			throw error;
		}
	},

	updateProject: async (id, projectData) => {
		try {
			const response = await api.put(`/api/projects/${id}`, projectData);
			return response.data;
		} catch (error) {
			console.error(`Error updating project :${id}`, error);
			throw error;
		}
	},

	deleteProject: async (id) => {
		console.log("Attempting to delete project with id:", id);
		console.log("API endpoint:", `/api/projects/${id}`);

		try {
			const response = await api.delete(`/api/projects/${id}`);
			console.log("[Frontend] Delete response:", response.data);
			return response.data;
		} catch (error) {
			console.error(`Error deleting project :${id}`, error);
			throw error;
		}
	},
};

export default projectServices;
