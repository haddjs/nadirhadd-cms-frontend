import React from "react";

const Card = ({ title, text }) => {
	return (
		<div className="w-64 p-6 rounded-lg backdrop-blur-sm bg-white/10 shadow-lg ring-2 ring-white/25">
			<div className="flex flex-col gap-4 text-white">
				<h1 className="text-2xl font-poppins font-semibold">{title}</h1>
				<h2 className="text-2xl font-semibold">{text}</h2>
			</div>
		</div>
	);
};

export default Card;
