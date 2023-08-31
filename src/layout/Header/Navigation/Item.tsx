import { IconNavItem, NavItem, TextNavItem } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";

export default function Item(props: NavItem) {
	// 图标
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const icons: {[key: string]: any} = { github: GithubOutlined };

	// 导航
	const navigate = useNavigate();

	// 路由
	const location = useLocation();

	// 文本导航
	const TextNav = (props: TextNavItem) => {
		// 活跃
		const active = location.pathname === props.path;

		return (
			<span
				className={`
          ml-1.5 p-2 cursor-pointer rounded hover:bg-gray-200/20 hover:text-white 
          ${active ? "bg-gray-200/20 text-white" : ""}
        `}
				onClick={() => {navigate(props.path);}}
			>
				{props.title}
			</span>
		);
	};

	// 图标导航
	const IconNav = ({ icon, link }: IconNavItem) => {
		const Icon = icons[icon];
		return (
			<Icon
				className="ml-2 text-lg hover:text-white"
				onClick={() => { window.open(link); }}
			/>
		);
	};

	// Fallback
	const Fallback = () => {
		return <span>Navigation Item Type Error</span>;
	};

	switch (props.type) {

		case "text":
			return <TextNav {...props} />;
		case "icon":
			return <IconNav {...props} />;
		default:
			return <Fallback />;

	}
}
