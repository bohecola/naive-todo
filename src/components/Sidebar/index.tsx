import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import {
	CheckOutlined,
	GithubOutlined,
	HistoryOutlined,
	InboxOutlined,
	InfoCircleOutlined,
	PlusCircleFilled,
	ScheduleOutlined
} from "@ant-design/icons";
import { useTodos } from "@/store/todos/context";
import { useQuickAdd } from "../QuickAdd";
import { todayKey } from "@/utils/date";

export default function Sidebar() {
	const todos = useTodos();
	const quickAdd = useQuickAdd();
	const today = todayKey();

	const inboxCount = todos.filter((todo) => !todo.completed).length;
	const todayCount = todos.filter((todo) => !todo.completed && todo.dueDate && todo.dueDate <= today).length;

	const navClass = ({ isActive }: { isActive: boolean }) => `side-link${isActive ? " is-active" : ""}`;

	return (
		<nav className="flex h-full flex-col px-3 py-4" aria-label="主导航">
			<div className="mb-4 flex items-center gap-2 px-2">
				<span className="logo-mark" aria-hidden="true"><CheckOutlined /></span>
				<span className="text-[17px] font-bold tracking-tight text-ink">NTodo</span>
			</div>

			<button type="button" className="side-link side-add" onClick={quickAdd}>
				<PlusCircleFilled className="side-icon" />
				添加任务
				<kbd className="side-kbd">Q</kbd>
			</button>

			<div className="mt-3 flex flex-col gap-0.5">
				<NavLink to="/inbox" className={navClass}>
					<InboxOutlined className="side-icon" />
					收件箱
					{inboxCount > 0 && <span className="side-count">{inboxCount}</span>}
				</NavLink>
				<NavLink to="/today" className={navClass}>
					<span className="side-icon cal-icon" aria-hidden="true">{dayjs().date()}</span>
					今天
					{todayCount > 0 && <span className="side-count">{todayCount}</span>}
				</NavLink>
				<NavLink to="/upcoming" className={navClass}>
					<ScheduleOutlined className="side-icon" />
					即将到来
				</NavLink>
			</div>

			<div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-3">
				<NavLink to="/about" className={navClass}>
					<InfoCircleOutlined className="side-icon" />
					关于
				</NavLink>
				<NavLink to="/changelog" className={navClass}>
					<HistoryOutlined className="side-icon" />
					更新日志
				</NavLink>
				<a
					className="side-link"
					href="https://github.com/bohecola/naive-todo"
					target="_blank"
					rel="noreferrer"
				>
					<GithubOutlined className="side-icon" />
					GitHub
				</a>
			</div>
		</nav>
	);
}
