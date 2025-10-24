import api from "./api";

export const getAbout = async () => {
	const response = await api.get("/api/about");
	return response;
};

export const updateAbout = async (data) => {
	const response = await api.put("/api/about", data);
	return response;
};
