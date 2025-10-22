import React, { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const tick = () => setTime(new Date());
		const timerId = setInterval(tick, 1000);

		return () => clearInterval(timerId);
	}, []);

	const h = time.getHours();
	const m = time.getMinutes().toString().padStart(2, "0");
	const s = time.getSeconds();

	return (
		<div className="bg-white/20 py-3 px-5 w-50 rounded-md ring-2 ring-white/25">
			<h1 className="font-bold text-white">
				{h} : {m} : {s}
			</h1>
		</div>
	);
};

export default Clock;
