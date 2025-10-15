import React from "react";

const SidebarItem = ({ IconComponent, title }) => {
	return (
		<div className="flex gap-5 py-2">
			<span>{IconComponent ? <IconComponent /> : "No Icon"}</span>
			<span>{title}</span>
		</div>
	);
};

export default SidebarItem;
