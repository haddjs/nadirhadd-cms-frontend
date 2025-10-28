import api from "./api";

const techServices = {
	getAllTechnologies: async () => {
		try {
			const response = await api.get("/api/tech");
			return response.data;
		} catch (error) {
			console.error("Error fetching technologies:", error);
			throw error;
		}
	},

	createTechnology: async (techName) => {
		try {
			const response = await api.post("/api/tech", { name: techName });
			return response.data;
		} catch (error) {
			console.error("Error creating technology:", error);
			throw error;
		}
	},
};

export default techServices;
