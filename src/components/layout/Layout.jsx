import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";

const Layout = () => {
	return (
		<div className="flex h-screen bg-[url(/images/bg.jpg)] bg-cover">
			<Sidebar />
			<MainContent>
				<Outlet />
			</MainContent>
		</div>
	);
};

export default Layout;
