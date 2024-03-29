import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Home from "@/views/Home";
import Log from "@/views/Log";
import Loading from "@/components/common/Loading";

const About = lazy(() => import("@/views/About"));

const withLoadingComponent = (comp: JSX.Element) => (
	<React.Suspense fallback={<Loading />} >
		{comp}
	</React.Suspense>
);

const routes = [
	{
		path: "/",
		element: <Navigate to="/home" />
	},
	{
		path: "/home",
		element: <Home />
	},
	{
		path: "/about",
		element: withLoadingComponent(<About />)
	},
	{
		path: "/changelog",
		element: withLoadingComponent(<Log />)
	}
];

export default routes;
