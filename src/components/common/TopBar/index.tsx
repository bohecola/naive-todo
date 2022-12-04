import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";
import "./index.scss";

export default function TopBar() {
	// 导航
	const navigate = useNavigate();
	// 当前导航索引
	const [curPath, setCurPath] = useState("/home");

	// 导航标签
	const navs = [
		{ path: "/home", title: "Home" },
		{ path: "/about", title: "About" }
	];

	// 导航点击
	function handlerNavClick(path: string) {
		setCurPath(path);
		localStorage.setItem("navPath", path);
		navigate(path);
	}

	// 挂载
	useEffect(() => {
		const localPath = window.location.hash.replace("#", "");
		setCurPath(localPath);
	}, []);

	return (
		<div className="top-bar">
			<div className="top-bar__left">NaiveTodo</div>
			<div className="flex1"></div>
			<div className="top-bar__right">
				{navs.map((nav, index) =>
					<span
						key={index}
						className={`top-bar-item ${curPath === nav.path ? "active" : ""}`}
						onClick={() => { handlerNavClick(nav.path); }}>
						{nav.title}
					</span>
				)}
				<span
					className="top-bar-link"
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
