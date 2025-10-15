import React from "react";

const Card = ({ text }) => {
	return (
		<div className="flex justify-between bg-amber-300">
			<h1>{text}</h1>
		</div>
	);
};

export default Card;
