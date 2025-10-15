import React from "react";

const MainContent = ({ children }) => {
	return <main className="flex-1 p-8 bg-background ml-64">{children}</main>;
};

export default MainContent;
