import { useCallback } from "react";
import api from "../services/api";

const useAuth = () => {
	const login = useCallback(async (credentials) => {
		try {
			const response = await api.post("api/auth/login", credentials);
			console.log(response);
			const data = response.data;

			localStorage.setItem("token", data.token);

			return data;
		} catch (error) {
			const message =
				error.response?.data?.message || "Login failed. Please try again";
			throw new Error(message);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("No token found!");

			await api.post("api/auth/logout");
			localStorage.removeItem("token");

			return { message: "Logged out successfully" };
		} catch (error) {
			const message =
				error.response?.data?.message || "Logout failed. Please try again";
			throw new Error(message);
		}
	}, []);

	return { login, logout };
};

export default useAuth;
