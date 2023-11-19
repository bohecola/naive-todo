import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import "@/assets/css/global.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<HashRouter>
			<ConfigProvider
				theme={{
					token: {
						colorBgContainer: "#1e293b",
						colorBorder: "#475569",
						colorBgElevated: "#475569"
					},
					algorithm: theme.darkAlgorithm
				}}
			>
				<App />
			</ConfigProvider>
		</HashRouter>
	</React.StrictMode>
);
