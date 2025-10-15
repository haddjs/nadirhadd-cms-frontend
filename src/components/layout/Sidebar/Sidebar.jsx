import React from "react";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "@/utils/constants";
import SidebarItem from "./SidebarItem";
import { Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";

const Sidebar = () => {
	return (
		<div className="fixed top-0 left-0 h-screen w-64 lg:bg-zinc-100">
			<div className="h-full flex flex-col font-poppins items-start gap-10 px-5 py-5">
				<p className="text-4xl">
					<i>nh</i> <span className="font-bold">CMS.</span>
				</p>
				<div className="flex items-center gap-4">
					<Avatar>NH</Avatar>
					<div className="flex flex-col text-sm">
						<span className="font-bold">Nadir Hadd</span>
						<span>Admin</span>
					</div>
				</div>
				<ul className="flex flex-col gap-5 pb-5">
					{MENU_ITEMS.map((item) => (
						<NavLink to={item.path}>
							<li key={item.path}>
								<SidebarItem
									IconComponent={item.iconComponent}
									title={item.title}
								/>
							</li>
						</NavLink>
					))}
					<hr className="text-zinc-500" />
					<div className="flex gap-5 py-2 px-5 hover:bg-zinc-200 hover:ps-7 rounded-lg transition-all">
						<Logout />
						Logout
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
