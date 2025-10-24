import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { MENU_ITEMS } from "@/utils/constants";
import SidebarItem from "./SidebarItem";
import { Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import Clock from "@/components/common/Clock";

import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
	const { user, logout } = useAuth();
	const [message, setMessage] = useState("");

	const navigate = useNavigate();
	const location = useLocation();
	const curr = location.pathname;

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			setMessage(error.message);
		}
	};

	const getUserInitials = () => {
		if (!user?.username) return "U";

		return user.username
			.split(" ")
			.map((name) => name[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const getDisplayName = () => {
		if (!user) return "Loading...";
		return user.username || user.name || "User";
	};

	return (
		<div className="fixed top-0 left-0 h-screen w-64 bg-zinc-100/20 backdrop-blur-md ring-2 ring-white/20 text-white">
			<div className="h-full flex flex-col font-poppins items-center gap-10 px-5 py-5">
				<p className="text-4xl">
					<i>nh</i> <span className="font-bold">CMS.</span>
				</p>
				<div className="flex items-center gap-4">
					<Avatar>{getUserInitials()}</Avatar>
					<div className="flex flex-col text-sm">
						{getDisplayName()}
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
						className="flex gap-5 py-2 px-5 w-50 hover:bg-white/20 hover:ps-7 rounded-lg transition-all cursor-pointer">
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
