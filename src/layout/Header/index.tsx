import Navigaiton from "./Navigation";
import { NavItem } from "@/types";

export default function PageLayoutHeader() {
	// 导航标签
	const navs: NavItem[] = [
		{ type: "text", title: "Home", path: "/home" },
		{ type: "text", title: "About", path: "/about" },
		{ type: "text", title: "Changelog", path: "/changelog" },
		{ type: "icon", icon: "github", link: "https://github.com/bohecola/naive-todo", isExternalLink: true }
	];

	return (
		<header className="flex items-center px-4 w-full h-[80px] bg-teal-600 text-gray-200">
			<div className="text-2xl">NTodo</div>
			<div className="flex-1"></div>
			<Navigaiton navs={navs} />
		</header>
	);
}
