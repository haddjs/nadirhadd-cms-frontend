import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { MENU_ITEMS } from "@/utils/constants";
import SidebarItem from "./SidebarItem";
import { Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import Clock from "@/components/common/Clock";

import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
	const { logout } = useAuth();
	const [message, setMessage] = useState("");

	const navigate = useNavigate();
	const location = useLocation();
	const curr = location.pathname;

	const handleLogout = async () => {
		try {
			const result = await logout();
			setMessage(result);
			navigate("/login");
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
		<div className="fixed top-0 left-0 h-screen w-64 bg-zinc-100/20 backdrop-blur-md ring-2 ring-white/20 text-white">
			<div className="h-full flex flex-col font-poppins items-center gap-10 px-5 py-5">
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
									active={curr === item.path}
								/>
							</li>
						</NavLink>
					))}
					<hr className="text-zinc-500" />
					<button
						onClick={handleLogout}
						className="flex gap-5 py-2 px-5 w-50 hover:bg-white/20 hover:ps-7 rounded-lg transition- cursor-pointer">
						<Logout />
						Logout
					</button>
					<p>{message}</p>
				</ul>
				<Clock />
			</div>
		</div>
	);
};

export default Sidebar;
