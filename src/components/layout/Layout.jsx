import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";

const Layout = ({ children }) => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<MainContent>{children}</MainContent>
		</div>
	);
};

export default Layout;
