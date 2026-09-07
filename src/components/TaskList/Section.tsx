import type { ReactNode } from "react";
import type { Todo } from "@/types";
import { useTodoActions } from "@/store/todos/context";
import TaskItem from "../Task/TaskItem";

interface Props {
	title?: ReactNode;
	count?: number;
	todos: Todo[];
	/** 允许拖拽排序（只在展示全局顺序的视图里开启） */
	sortable?: boolean;
	children?: ReactNode;
}

export default function Section({ title, count, todos, sortable, children }: Props) {
	const actions = useTodoActions();
	const [draggingId, setDraggingId] = useState<string>();
	const [overId, setOverId] = useState<string>();

	const drag = sortable
		? {
			draggingId,
			overId,
			onDragStart: setDraggingId,
			onDragEnter: setOverId,
			onDragEnd: () => {
				if (draggingId && overId && draggingId !== overId) {
					actions.reorder(draggingId, overId);
				}
				setDraggingId(undefined);
				setOverId(undefined);
			}
		}
		: undefined;

	return (
		<section className="mb-8">
			{title && (
				<h2 className="section-title">
					<span>{title}</span>
					{count !== undefined && count > 0 && <span className="section-count">{count}</span>}
				</h2>
			)}
			{todos.length > 0 && (
				<ul className="m-0 list-none p-0">
					{todos.map((todo) => (
						<TaskItem key={todo.id} todo={todo} drag={drag} />
					))}
				</ul>
			)}
			{children}
		</section>
	);
}
