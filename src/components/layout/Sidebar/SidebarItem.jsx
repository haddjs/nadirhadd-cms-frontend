import React from "react";

const SidebarItem = ({ IconComponent, title }) => {
	return (
		<div className="flex gap-5 py-2 px-5 hover:bg-zinc-200 hover:ps-7 rounded-lg transition-all">
			<span>{IconComponent ? <IconComponent /> : "No Icon"}</span>
			<span>{title}</span>
		</div>
	);
};

export default SidebarItem;
