import { useNavigate, useLocation } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";

export default function PageLayoutHeader() {
	// 导航
	const navigate = useNavigate();

	// 路由
	const location = useLocation();

	// 导航标签
	const navs = [
		{ path: "/home", title: "Home" },
		{ path: "/about", title: "About" }
	];

	return (
		<div className="page-layout__header">
			<div className="page-layout__header-left">NaiveTodo</div>
			<div className="flex1"></div>
			<div className="page-layout__header-right">
				{navs.map((nav, index) =>
					<span
						key={index}
						className={`page-layout__header-item ${location.pathname === nav.path ? "active" : ""}`}
						onClick={() => { navigate(nav.path); }}>
						{nav.title}
					</span>
				)}
				<span
					className="page-layout__header-link"
					style={{
						cursor: "pointer",
						fontSize: "1.25rem",
						marginLeft: "0.5rem"
					}}
					onClick={() => { window.open("https://github.com/bohecola/naive-todo"); }}
				>
					<GithubOutlined />
				</span>
			</div>
		</div>
	);
}
