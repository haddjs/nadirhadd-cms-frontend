import { Dashboard, Construction, Work, Person } from "@mui/icons-material";

export const MENU_ITEMS = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: "dashboard",
		iconComponent: Dashboard,
	},
	{
		title: "About",
		path: "/dashboard/about",
		icon: "person",
		iconComponent: Person,
	},
	{
		title: "Projects",
		path: "/dashboard/project",
		icon: "construction",
		iconComponent: Construction,
	},
	{
		title: "Experience",
		path: "/dashboard/experience",
		icon: "work",
		iconComponent: Work,
	},
];

export const FORM_ITEMS = [
	{
		title: "Name",
		previewInput: "Enter your name.",
	},
	{
		title: "About",
		previewInput: "Enter about yourself.",
	},
];
