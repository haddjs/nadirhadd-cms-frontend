import React from "react";

const SidebarItem = ({ IconComponent, title, active }) => {
	return (
		<div
			className={`flex gap-5 py-2 px-5 rounded-lg transition-all ${
				active
					? "bg-white/20 w-50 rounded-lg ps-7"
					: "hover:bg-white/20 hover:ps-7"
			}`}>
			<span>{IconComponent && <IconComponent />}</span>
			<span>{title}</span>
		</div>
	);
};

export default SidebarItem;
