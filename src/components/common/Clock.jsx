import React, { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const tick = () => setTime(new Date());
		const timerId = setInterval(tick, 1000);

		return () => clearInterval(timerId);
	}, []);

	const formatTime = time.toLocaleString("id-ID", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<div className="bg-white/20 py-3 px-5 w-50 rounded-md ring-2 ring-white/25">
			<h1 className="font-bold text-black">{formatTime}</h1>
		</div>
	);
};

export default Clock;
