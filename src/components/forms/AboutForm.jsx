import React, { useEffect, useState } from "react";
import AvatarUpload from "../common/AvatarUpload";
import { FORM_ITEMS } from "@/utils/constants";
import { TextareaAutosize, Snackbar } from "@mui/material";
import useAbout from "@/hooks/useAbout";

const AboutForm = ({ onShowSnackbar }) => {
	const { about, loading, error, updateAbout } = useAbout();

	const [form, setForm] = useState({
		profile_picture: "",
		summary_profile: "",
		name: "",
	});

	useEffect(() => {
		if (about) {
			console.log("Setting from with about data", about);

			setForm({
				profile_picture: about.profile_picture || "",
				summary_profile: about.summary_profile || "",
				name: about.user?.username || "Unknown Name",
			});
		}
	}, [about]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const updateData = {
				profile_picture: form.profile_picture,
				summary_profile: form.summary_profile,
			};
			await updateAbout(updateData);
			onShowSnackbar("Profile updated!");
		} catch (error) {
			onShowSnackbar(error.message || "Failed to update profile.");
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="flex flex-col gap-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-sm ring-1 ring-white/30 p-6">
			<div className="font-semibold text-3xl">My Profile</div>
			<div className="flex w-full">
				<AvatarUpload
					image={form.profile_picture}
					onImageChange={(newImage) =>
						setForm({ ...form, profile_picture: newImage })
					}
				/>
				<form onSubmit={handleSave}>
					{FORM_ITEMS.map((item, index) => (
						<div key={index} className="p-8">
							<div className="flex flex-col gap-2 w-64">
								<label className="font-semibold">{item.title}</label>
								{item.title === "Name" ? (
									<input
										type="text"
										name="name"
										placeholder={item.previewInput}
										value={form.name || "Unknown"}
										onChange={handleChange}
										className="ring-1 ring-white/20 rounded-md p-3 outline-0 focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
									/>
								) : (
									<TextareaAutosize
										name="summary_profile"
										placeholder={item.previewInput}
										value={form.summary_profile}
										onChange={handleChange}
										maxRows={2}
										className="ring-1 ring-white/20 rounded-md p-3 outline-0 focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
									/>
								)}
							</div>
						</div>
					))}
					<div className="px-9">
						<button
							type="submit"
							className="py-2 px-4 bg-black/10 rounded-lg shadow-lg backdrop-blur-lg ring-1 ring-white/30 hover:bg-white/10 hover:ring-white/10 transition-all">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AboutForm;
