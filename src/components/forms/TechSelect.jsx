import React, { useState, useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { X, ChevronDown } from "lucide-react";

const TechSelect = ({ value = [], onChange, existingTechnologies = [] }) => {
	const [selectedTech, setSelectedTech] = useState(value);
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const inputRef = useRef(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setSelectedTech(Array.isArray(value) ? value : []);
	}, [value]);

	useEffect(() => {
		if (inputValue.trim()) {
			const filtered = (existingTechnologies || []).filter(
				(tech) =>
					tech.name.toLowerCase().includes(inputValue.toLowerCase()) &&
					!selectedTech.includes(tech.name)
			);
			setSuggestions(filtered);
		} else {
			setSuggestions(existingTechnologies || []);
		}
	}, [inputValue, existingTechnologies, selectedTech]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const addTech = (techName) => {
		const normalizedTech = techName.trim();
		if (!normalizedTech || selectedTech.includes(normalizedTech)) return;

		const newTech = [...selectedTech, normalizedTech];
		setSelectedTech(newTech);
		onChange(newTech);
		setInputValue("");
		setOpen(false);
	};

	const removeTech = (techToRemove) => {
		const newTech = selectedTech.filter((tech) => tech !== techToRemove);
		setSelectedTech(newTech);
		onChange(newTech);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && inputValue.trim()) {
			e.preventDefault();
			addTech(inputValue);
		} else if (e.key === "Escape") {
			setOpen(false);
		} else if (
			e.key === "Backspace" &&
			!inputValue &&
			selectedTech.length > 0
		) {
			removeTech(selectedTech[selectedTech.length - 1]);
		}
	};

	const handleInputFocus = () => {
		setOpen(true);
		setSuggestions(existingTechnologies || []);
	};

	const safeSelectedTech = Array.isArray(selectedTech) ? selectedTech : [];
	const safeSuggestion = Array.isArray(suggestions) ? suggestions : [];

	return (
		<div className="space-y-3" ref={dropdownRef}>
			<div className="flex flex-wrap gap-2">
				{safeSelectedTech.map((tech, index) => (
					<Badge
						key={tech || `tech-${index}`}
						className="flex items-center gap-1 px-3 py-1 text-sm bg-white/20">
						{tech}
						<button
							type="button"
							onClick={() => removeTech(tech)}
							className="ml-2 hover:text-red-500">
							<X className="size-3" />
						</button>
					</Badge>
				))}
			</div>

			<div className="relative">
				<div className="flex items-center">
					<input
						type="text"
						ref={inputRef}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						onFocus={handleInputFocus}
						placeholder="Type technology and press Enter..."
						className="flex-1 p-3 ring-1  ring-white/20 focus:ring-white/40 focus:ring-2 focus:rounded-lg outline-0 transition-all"
					/>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						className="px-3 py-2">
						<ChevronDown
							className={`size-4 ${open ? "rotate-90" : ""} transition-all`}
						/>
					</button>
				</div>

				{open && (
					<div className="absolute z-50 w-full bg-white/20 backdrop-blur-md rounded-b-lg">
						{inputValue.trim() &&
							!safeSuggestion.some(
								(tech) =>
									tech.name.toLowerCase() === inputValue.toLowerCase() && (
										<div
											onClick={() => addTech(inputValue)}
											className="px-3 py-2">
											+ Create "{inputValue}"
										</div>
									)
							)}

						{safeSuggestion.length > 0 ? (
							safeSuggestion.map((tech) => (
								<div
									key={tech.id}
									onClick={() => addTech(tech.name)}
									className="px-3 py-2">
									{tech.name}
								</div>
							))
						) : inputValue.trim() ? (
							<div className="px-3 py-2">No matching technologies</div>
						) : (
							<div className="px-3 py-2 text-gray-400">
								Start typing to see suggestions
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default TechSelect;
