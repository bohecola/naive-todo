import type { DragEvent } from "react";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import type { Todo } from "@/types";
import { useTodoActions } from "@/store/todos/context";
import TaskCheck from "./TaskCheck";
import DueChip from "./DueChip";
import TaskEditor from "./TaskEditor";

export interface DragHandlers {
	onDragStart: (id: string) => void;
	onDragEnter: (id: string) => void;
	onDragEnd: () => void;
	draggingId?: string;
	overId?: string;
}

interface Props {
	todo: Todo;
	drag?: DragHandlers;
}

export default function TaskItem({ todo, drag }: Props) {
	const actions = useTodoActions();
	const [editing, setEditing] = useState(false);

	if (editing) {
		return (
			<li className="py-1">
				<TaskEditor
					initial={todo}
					submitLabel="保存"
					onSubmit={(draft) => {
						actions.update(todo.id, draft);
						setEditing(false);
					}}
					onCancel={() => setEditing(false)}
				/>
			</li>
		);
	}

	const draggable = Boolean(drag) && !todo.completed;

	return (
		<li
			className="task-row"
			data-completed={todo.completed}
			data-dragging={drag?.draggingId === todo.id}
			data-over={drag?.overId === todo.id && drag?.draggingId !== todo.id}
			draggable={draggable}
			onDragStart={(event: DragEvent<HTMLLIElement>) => {
				event.dataTransfer.effectAllowed = "move";
				drag?.onDragStart(todo.id);
			}}
			onDragEnter={() => drag?.onDragEnter(todo.id)}
			onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; }}
			onDragEnd={() => drag?.onDragEnd()}
		>
			{draggable && (
				<span className="drag-handle" aria-hidden="true">
					<HolderOutlined />
				</span>
			)}

			<TaskCheck
				priority={todo.priority}
				checked={todo.completed}
				onChange={(completed) => actions.toggle(todo.id, completed)}
			/>

			<button
				type="button"
				className="task-body"
				onClick={() => setEditing(true)}
				aria-label={`编辑任务：${todo.content}`}
			>
				<span className="task-title">{todo.content}</span>
				{todo.note && <span className="task-note">{todo.note}</span>}
				{todo.dueDate && <DueChip dueDate={todo.dueDate} muted={todo.completed} />}
			</button>

			<div className="task-actions">
				<Tooltip title="编辑">
					<Button
						type="text"
						size="small"
						aria-label="编辑"
						icon={<EditOutlined />}
						onClick={() => setEditing(true)}
					/>
				</Tooltip>
				<Tooltip title="删除">
					<Button
						type="text"
						size="small"
						aria-label="删除"
						icon={<DeleteOutlined />}
						onClick={() => actions.remove(todo)}
					/>
				</Tooltip>
			</div>
		</li>
	);
}
