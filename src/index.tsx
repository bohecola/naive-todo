import ReactDOM from "react-dom/client";
import { App as AntApp, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import "@/assets/css/global.css";
import App from "./App";

dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<StrictMode>
		<HashRouter>
			<ConfigProvider
				locale={zhCN}
				theme={{
					token: {
						colorPrimary: "#dc4c3e",
						colorText: "#202020",
						colorTextSecondary: "#808080",
						colorBorder: "#e5e5e5",
						colorSplit: "#f0f0f0",
						borderRadius: 6,
						fontFamily: "var(--font-sans)",
						fontSize: 14
					},
					components: {
						Button: { defaultShadow: "none", primaryShadow: "none" },
						Modal: { contentBg: "transparent", boxShadow: "none" }
					}
				}}
			>
				<AntApp>
					<App />
				</AntApp>
			</ConfigProvider>
		</HashRouter>
	</StrictMode>
);
