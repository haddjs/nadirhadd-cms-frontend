import { useState, useEffect } from "react";
import {
	getAbout,
	updateAbout as updateAboutServices,
} from "@/services/aboutServices";

const useAbout = () => {
	const [about, setAbout] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAbout = async () => {
			try {
				const response = await getAbout();
				setAbout(response.data);
			} catch (error) {
				console.error("error details", error);
				setError(error.response?.data?.message || "Failed load about info!");
			} finally {
				setLoading(false);
			}
		};

		fetchAbout();
	}, []);

	const updateAbout = async (data) => {
		try {
			updateAboutServices(data);
			const updatedResponse = await getAbout();
			setAbout(updatedResponse.data);
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to update about info!"
			);
		}
	};

	return { about, loading, error, updateAbout };
};

export default useAbout;
