import React from "react";

const SidebarItem = ({ IconComponent, title, active }) => {
	return (
		<div
			className={`flex gap-5 py-2 px-5 rounded-lg transition-all ${
				active ? "bg-zinc-200 w-50 rounded-lg" : "hover:bg-zinc-200 hover:ps-7"
			}`}>
			<span>{IconComponent ? <IconComponent /> : "No Icon"}</span>
			<span>{title}</span>
		</div>
	);
};

export default SidebarItem;
