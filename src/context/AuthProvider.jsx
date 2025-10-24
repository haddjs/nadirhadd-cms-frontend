import React, { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const userData = localStorage.getItem("user");

		if (token && userData) {
			try {
				setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Error parsing user data", error);
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			}
		}
		setLoading(false);
	}, []);

	const login = useCallback(async (credentials) => {
		try {
			const response = await api.post("/api/auth/login", credentials);
			const { token, user } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			setUser(user);

			return response.data;
		} catch (error) {
			const message =
				error.response?.data?.message || "Login failed. Please try again";
			throw new Error(message);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			const token = localStorage.getItem("token");
			await api.post(
				"/api/auth/logout",
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
		} catch (error) {
			console.error("Logout failed", error);
		} finally {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			setUser(null);
		}
	}, []);

	const value = {
		user,
		login,
		logout,
		loading,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
