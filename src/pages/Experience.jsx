import React from "react";
import AddButton from "@/components/common/AddButton";
import ExperienceCard from "@/components/common/ExperienceCard";

const Experience = () => {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between text-white">
				<h1 className="font-bold text-4xl">Experience</h1>
				<AddButton title={"Add Experience"} />
			</div>
			<div>
				<ExperienceCard
					title={"Telkom Education Foundation"}
					description={`Implementing UI Design of employee's presence and account management into fully functional website using NuxtJS Javascript's framework. Other than that, building API for integrating with Backend using Axios.`}
				/>
			</div>
		</div>
	);
};

export default Experience;
