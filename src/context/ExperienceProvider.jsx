import React, { useState, useEffect, useCallback } from "react";
import experienceServices from "../services/experienceServices";
import { ExperienceContext } from "./ExperienceContext";

export const ExperienceProvider = ({ children }) => {
	const [experiences, setExperiences] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchExperience = useCallback(async () => {
		try {
			setLoading(true);
			const data = await experienceServices.getExperience();
			setExperiences(data);
			setError(null);
		} catch (error) {
			setError(error.message || "Failed to fetch experience");
		} finally {
			setLoading(false);
		}
	}, []);

	const addExperience = useCallback(async (experienceData) => {
		try {
			const newExperience = await experienceServices.addExperience(
				experienceData
			);
			setExperiences((prev) => [...prev, newExperience.experience]);
			return newExperience;
		} catch (error) {
			setError(error.message || "Failed to add experience");
			throw error;
		}
	}, []);

	const updateExperience = useCallback(async (id, experienceData) => {
		try {
			const updatedExperience = await experienceServices.updateExperience(
				id,
				experienceData
			);
			setExperiences((prev) =>
				prev.map((exp) =>
					exp.id === parseInt(id) ? updatedExperience.experience : exp
				)
			);
			return updatedExperience;
		} catch (error) {
			console.error("Error updating experience in provider!", error);
			setError(error.message || "Failed to update experience");
			throw error;
		}
	}, []);

	const deleteExperience = useCallback(async (id) => {
		try {
			await experienceServices.deleteExperience(id);
			setExperiences((prev) => prev.filter((exp) => exp.id !== id));
		} catch (error) {
			setError(error.message || "Failed to delete experience");
			throw error;
		}
	}, []);

	useEffect(() => {
		fetchExperience();
	}, [fetchExperience]);

	const value = {
		experiences,
		loading,
		error,
		fetchExperience,
		addExperience,
		updateExperience,
		deleteExperience,
	};

	return (
		<ExperienceContext.Provider value={value}>
			{children}
		</ExperienceContext.Provider>
	);
};
