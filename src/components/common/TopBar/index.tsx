import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function TopBar() {
	const navigate = useNavigate();

	const [curIdx, setCurIdx] = useState(0);

	const navs = [
		{ path: "/home", title: "Home" },
		{ path: "/about", title: "About" }
	];

	function navHandler(path: string, index: number) {
		setCurIdx(index);
		localStorage.setItem("navIndex", index.toString());
		navigate(path);
	}

	useEffect(() => {
		setCurIdx(Number(localStorage.getItem("navIndex")));
	}, []);

	return (
		<div className="top-bar">
			<div className="top-bar__left">NaiveTodo</div>
			<div className="flex1"></div>
			<div className="top-bar__right">
				{navs.map((nav, index) =>
					<span
						key={index}
						className={`top-bar-item ${curIdx === index ? "active" : ""}`}
						onClick={() => { navHandler(nav.path, index); }}>
						{nav.title}
					</span>
				)}
			</div>
		</div>
	);
}
