import React from "react";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "@/utils/constants";
import SidebarItem from "./SidebarItem";
import { Avatar } from "@mui/material";

const Sidebar = () => {
	return (
		<div className="fixed top-0 h-screen w-1/8 bg-zinc-100">
			<div className="flex flex-col font-poppins items-center py-10 gap-10">
				<span className="text-4xl">nh CMS</span>
				<div className="flex items-center gap-4">
					<Avatar>NH</Avatar>
					<div className="flex flex-col text-sm">
						<span className="font-bold">Nadir Hadd</span>
						<span>Admin</span>
					</div>
				</div>
				<ul className="">
					{MENU_ITEMS.map((item) => (
						<li key={item.path}>
							<SidebarItem
								IconComponent={item.iconComponent}
								title={item.title}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
