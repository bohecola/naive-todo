import { useRoutes } from "react-router-dom";
import router from "@/router";
import Header from "./Header/index";
import "./index.scss";

export default function Layout() {
	const outlet = useRoutes(router);

	return (
		<div className="page-layout">
			<Header />
			<div className="page-layout__body">
				{outlet}
			</div>
		</div>
	);
}
