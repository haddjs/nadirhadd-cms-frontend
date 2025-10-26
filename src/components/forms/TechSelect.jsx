import React, { useState, useEffect } from "react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

const TechSelect = ({ value = [], onChange, existingTechnologies = [] }) => {
	const [selectedTech, setSelectedTech] = useState(value);
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		setSelectedTech(value);
	}, [value]);

	useEffect(() => {
		if (inputValue.trim()) {
			const filtered = existingTechnologies.filter(
				(tech) =>
					tech.name.toLowerCase().includes(inputValue.toLowerCase()) &&
					!selectedTech.includes(tech.name)
			);
			setSuggestions(filtered);
		} else {
			setSuggestions([]);
		}
	}, [inputValue, existingTechnologies, selectedTech]);

	const addTech = (techName) => {
		const normalizedTech = techName.trim();
		if (normalizedTech && !selectedTech.includes(normalizedTech)) return;

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
		}
	};

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap gap-2">
				{selectedTech.map((tech) => (
					<Badge
						key={tech}
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

			<Command className="border rounded-lg">
				<CommandInput
					placeholder="Add Technologies..."
					value={inputValue}
					onValueChange={setInputValue}
					onFocus={() => setOpen(true)}
					onKeyDown={handleKeyDown}
				/>
				{open && (
					<CommandList>
						<CommandEmpty>
							{inputValue ? (
								<CommandItem
									onSelect={() => addTech(inputValue)}
									className="cursor-pointer">
									Create "{inputValue}"
								</CommandItem>
							) : (
								"Type to create or search technologies"
							)}
						</CommandEmpty>
						{suggestions.length > 0 && (
							<CommandGroup heading="Existing Technologies">
								{suggestions.map((tech) => (
									<CommandItem
										key={tech.id}
										onSelect={() => addTech(tech.name)}
										classname="cursor-pointer">
										{tech.name}
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				)}
			</Command>
			<p>
				Press Enter to create new tech stack, or click on suggestions to use
				existing ones.
			</p>
		</div>
	);
};

export default TechSelect;
