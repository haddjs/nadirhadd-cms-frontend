import React, { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const timeFormat = time.toLocaleString("id-ID", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	const clockReminder = timeFormat.split(":")[0];
	const dayNightReminder = timeFormat.split(" ")[1];

	const reminder =
		(dayNightReminder === "PM" && clockReminder >= 10) ||
		(dayNightReminder === "AM" && clockReminder >= 12) ||
		clockReminder < 6;

	return (
		<div className="bg-white/20 py-3 px-5 w-50 rounded-md ring-2 ring-white/25">
			<h1 className="font-bold text-black">
				<div className="flex flex-col gap-3">
					<h1>{timeFormat}</h1>
					<span className="font-medium">
						{reminder ? (
							<p>
								Sleep, <br />
								Enough coding for today.
							</p>
						) : (
							<p>Let's do some code!</p>
						)}
					</span>
				</div>
			</h1>
		</div>
	);
};

export default Clock;
