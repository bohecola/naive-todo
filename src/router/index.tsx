import type { ReactElement } from "react";
import Inbox from "@/views/Inbox";
import Today from "@/views/Today";
import Upcoming from "@/views/Upcoming";
import Loading from "@/components/common/Loading";

const About = lazy(() => import("@/views/About"));
const Log = lazy(() => import("@/views/Log"));

const withLoading = (element: ReactElement) => (
	<Suspense fallback={<Loading />}>
		{element}
	</Suspense>
);

const routes = [
	{ path: "/", element: <Navigate to="/inbox" replace /> },
	// 旧链接兼容
	{ path: "/home", element: <Navigate to="/inbox" replace /> },
	{ path: "/inbox", element: <Inbox /> },
	{ path: "/today", element: <Today /> },
	{ path: "/upcoming", element: <Upcoming /> },
	{ path: "/about", element: withLoading(<About />) },
	{ path: "/changelog", element: withLoading(<Log />) },
	{ path: "*", element: <Navigate to="/inbox" replace /> }
];

export default routes;
