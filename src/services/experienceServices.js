import api from "./api";

const experienceServices = {
	getExperience: async () => {
		try {
			const response = await api.get("/api/experience");
			return response.data;
		} catch (error) {
			console.error("Error fetching experience:", error);
			throw error;
		}
	},

	getExperienceById: async (id) => {
		try {
			const response = await api.get(`/api/experience/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching experience by: ${id}`, error);
			throw error;
		}
	},

	addExperience: async (experienceData) => {
		try {
			const response = await api.post("/api/experience", experienceData);
			return response.data;
		} catch (error) {
			console.error("Error adding experience:", error);
			throw error;
		}
	},

	updateExperience: async (id, experienceData) => {
		try {
			const response = await api.put(`/api/experience/${id}`, experienceData);
			return response.data;
		} catch (error) {
			console.error(`Error update experience: ${id}`, error);
			throw error;
		}
	},

	deleteExperience: async (id) => {
		try {
			const response = await api.delete(`/api/experience/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting experience: ${id}`, error.message);
			throw error;
		}
	},
};

export default experienceServices;
