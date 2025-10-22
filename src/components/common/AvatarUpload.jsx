import { useState, useRef } from "react";
import { Image } from "@mui/icons-material";

const AvatarUpload = () => {
	const [image, setImage] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current.click();
	};

	const removeImage = () => {
		setImage(null);
	};

	return (
		<div className="flex flex-col gap-5">
			<div
				className={`w-64 h-64 rounded-lg flex items-center justify-center ring-1 ring-white/30 transition-colors duration-200 ${
					image
						? "bg-white/10"
						: "bg-white/10 hover:bg-black/10 backdrop-blur-md"
				}`}>
				{image ? (
					<img
						src={image}
						alt="Avatar preview"
						className="w-full h-full object-cover rounded-lg"
					/>
				) : (
					<Image className="text-white" />
				)}
			</div>

			<div className="flex gap-6">
				{!image ? (
					<button
						onClick={triggerFileInput}
						className="py-2 px-4 bg-black/10 rounded-lg shadow-lg backdrop-blur-md ring-1 ring-white/30 hover:bg-white/10 hover:ring-white/10 transition-all">
						Upload File
					</button>
				) : (
					<>
						<button
							onClick={triggerFileInput}
							className="py-2 px-4 bg-black/10 rounded-lg shadow-lg backdrop-blur-lg ring-1 ring-white/30 hover:bg-white/10 hover:ring-white/10 transition-all">
							Change File
						</button>
						<button
							onClick={removeImage}
							className="py-2 px-4 bg-black/10 rounded-lg shadow-lg backdrop-blur-lg ring-1 ring-white/30 hover:bg-white/10 hover:ring-white/10 transition-all">
							Remove
						</button>
					</>
				)}
			</div>

			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				className="hidden"
				accept="image/*"
			/>
		</div>
	);
};

export default AvatarUpload;
