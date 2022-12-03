import React, { ReactElement } from "react";
import { useRoutes } from "react-router-dom";
import router from "@/router";
import "./index.scss";

interface Props {
	header(): ReactElement
}

export default function Layout(props: Props) {
	const outlet = useRoutes(router);

	return (
		<div className="page-layout">
			<div className="page-layout__header">
				{props.header()}
			</div>
			<div className="page-layout__body">
				{outlet}
			</div>
		</div>
	);
}
