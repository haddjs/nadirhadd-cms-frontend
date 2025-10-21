import React from "react";

const MainContent = ({ children }) => {
	return (
		<main className="flex-1 bg-[url(/images/bg.jpg)] bg-cover p-8 ml-64">
			{children}
		</main>
	);
};

export default MainContent;
