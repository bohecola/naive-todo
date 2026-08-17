import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "@/assets/css/global.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
	<StrictMode>
		<HashRouter>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#64748b",
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
	</StrictMode>
);
