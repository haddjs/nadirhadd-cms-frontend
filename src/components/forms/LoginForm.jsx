import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const LoginForm = () => {
	const { login } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			await login({ username, password });
			navigate("/dashboard");
		} catch (error) {
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleLogin} className="text-white">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<label className="font-semibold">Username</label>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="ring-1 ring-white/20 rounded-md p-3 outline-0 focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-semibold">Password</label>
						<input
							type="password"
							placeholder="******"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="ring-1 ring-white/20 rounded-md p-3 outline-0 focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
							required
						/>
					</div>
					<button
						type="submit"
						className="font-semibold py-2 px-4 bg-white/10 rounded-lg shadow-lg backdrop-blur-lg ring-1 ring-white/30 hover:bg-black/10 hover:ring-white/10 transition-all">
						{loading ? "Logging in..." : "Login"}
					</button>
					{message && <p>{message}</p>}
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
