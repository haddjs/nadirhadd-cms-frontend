import React from "react";
import ProjectsCard from "@/components/common/ProjectsCard";
import AddButton from "@/components/common/AddButton";

const Projects = () => {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between text-white">
				<h1 className="font-bold text-4xl">Projects</h1>
				<AddButton title={"Add Project"} />
			</div>
			<div>
				<ProjectsCard
					title={"FlowLovedSome Money Management"}
					description={
						"Web based app for tracking cashflow and revenue makes this app suits for business owner. Add income or expenses easily and check the transaction logs. User also able to see real-time cashflow displayed in chart. Built with Next JS, TailwindCSS, and Firebase."
					}
				/>
			</div>
		</div>
	);
};

export default Projects;
