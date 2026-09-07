import { Button, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { Todo } from "@/types";
import { useTodoActions } from "@/store/todos/context";
import TaskItem from "../Task/TaskItem";

interface Props {
	todos: Todo[];
	/** 清空按钮是否作用于全部已完成任务 */
	clearable?: boolean;
}

export default function CompletedSection({ todos, clearable }: Props) {
	const actions = useTodoActions();
	const [open, setOpen] = useState(false);

	if (todos.length === 0) return null;

	const sorted = [...todos].sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));

	return (
		<section className="mt-4 border-t border-line pt-3">
			<div className="flex items-center justify-between">
				<button
					type="button"
					className="completed-toggle"
					aria-expanded={open}
					onClick={() => setOpen(!open)}
				>
					<DownOutlined className="completed-arrow" data-open={open} />
					已完成
					<span className="section-count">{todos.length}</span>
				</button>
				{clearable && open && (
					<Popconfirm
						title="清空已完成的任务？"
						description="这会永久删除全部已完成的任务。"
						okText="清空"
						cancelText="取消"
						okButtonProps={{ danger: true }}
						onConfirm={actions.clearCompleted}
					>
						<Button type="text" size="small">清空</Button>
					</Popconfirm>
				)}
			</div>
			{open && (
				<ul className="m-0 mt-1 list-none p-0">
					{sorted.map((todo) => (
						<TaskItem key={todo.id} todo={todo} />
					))}
				</ul>
			)}
		</section>
	);
}
