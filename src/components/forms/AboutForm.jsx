import React from "react";
import AvatarUpload from "../common/AvatarUpload";
import { FORM_ITEMS } from "@/utils/constants";
import { TextareaAutosize } from "@mui/material";

const AboutForm = () => {
	return (
		<div className="flex flex-col gap-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-sm ring-1 ring-white/30 p-6">
			<div className="font-semibold text-3xl">My Profile</div>
			<div className="flex w-full">
				<AvatarUpload />
				<form>
					{FORM_ITEMS.map((item, index) => (
						<div key={index} className="p-8">
							<div className="flex flex-col gap-2 w-64">
								<label className="font-semibold">{item.title}</label>
								{item.title === "Name" ? (
									<input
										type="text"
										placeholder={item.previewInput}
										className="ring-1 ring-white/20 rounded-md p-3 outline-0 focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
									/>
								) : (
									<TextareaAutosize
										placeholder={item.previewInput}
										maxLength={200}
										maxRows={2}
										className="ring-1 ring-white/20 rounded-md p-3 outline-0 focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
									/>
								)}
							</div>
						</div>
					))}
				</form>
			</div>
		</div>
	);
};

export default AboutForm;
