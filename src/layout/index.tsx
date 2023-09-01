import { useRoutes } from "react-router-dom";
import router from "@/router";
import Header from "./Header/index";

export default function Layout() {
	const outlet = useRoutes(router);

	return (
		<div>
			<Header />
			<div className="mt-5 py-5 mx-auto max-w-3xl">
				{outlet}
			</div>
		</div>
	);
}
