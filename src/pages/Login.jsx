import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-[url(/images/bgLogin.jpg)] h-screen bg-cover">
			<div className="flex flex-col gap-8 bg-black/30 p-10 rounded-lg shadow-lg backdrop-blur-sm ring-1 ring-white/10">
				<h1 className="text-white text-4xl text-center font-bold font-poppins">
					Login
				</h1>
				<div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
