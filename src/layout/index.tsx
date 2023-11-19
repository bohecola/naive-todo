import { useRoutes } from "react-router-dom";
import router from "@/router";
import Header from "./Header/index";

export default function Layout() {
	const outlet = useRoutes(router);

	return (
		<div>
			<Header />
			<main className="dot-grid py-5 min-h-[calc(100vh-80px)]">
				{outlet}
			</main>
		</div>
	);
}
