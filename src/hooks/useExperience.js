import { useContext } from "react";
import { ExperienceContext } from "../context/ExperienceContext";

const useExperience = () => {
	const context = useContext(ExperienceContext);

	if (!context) {
		throw new Error("useExperience must be within a ExperienceProvider");
	}

	return context;
};

export default useExperience;
