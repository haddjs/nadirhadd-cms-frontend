import { useState, useEffect } from "react";
import techServices from "../services/techServices";

const useTech = () => {
	const [technologies, setTechnologies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchTechnologies = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await techServices.getAllTechnologies();
			setTechnologies(data);
		} catch (error) {
			setError(error.message || "Failed to fetch technologies");
			console.error("Error fetching technologies:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTechnologies();
	}, []);

	const refetch = () => {
		fetchTechnologies();
	};

	return { technologies, loading, error, refetch };
};

export default useTech;
