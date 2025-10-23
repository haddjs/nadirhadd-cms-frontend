import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "@/hooks/useAuth";

const ProtectedRoutes = () => {
	const { user, loading } = useAuth();
	const token = localStorage.getItem("token");

	if (loading) {
		return (
			<div>
				<div>Loading...</div>
			</div>
		);
	}

	if (!user && token) {
		try {
			const { exp } = jwtDecode(token);
			if (Date.now() / 1000 > exp) {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				return <Navigate to="/login" replace />;
			}
			return <Navigate to="/login" replace />;
		} catch {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			return <Navigate to="/login" replace />;
		}
	}

	if (!user || !token) return <Navigate to="/login" replace />;

	try {
		const { exp } = jwtDecode(token);
		if (Date.now() / 1000 > exp) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			return <Navigate to="/login" replace />;
		}
	} catch {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
