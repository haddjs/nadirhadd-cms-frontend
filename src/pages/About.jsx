import React from "react";
import AboutForm from "@/components/forms/AboutForm";

const About = () => {
	return (
		<div className="flex flex-col gap-8 text-white">
			<h1 className="font-bold text-4xl">About</h1>
			<div>
				<AboutForm />
			</div>
		</div>
	);
};

export default About;
