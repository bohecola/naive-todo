import { PlusOutlined } from "@ant-design/icons";
import type { TodoDraft } from "@/types";
import { useTodoActions } from "@/store/todos/context";
import TaskEditor from "../Task/TaskEditor";

interface Props {
	defaults?: Partial<TodoDraft>;
}

// 列表底部的「添加任务」行，点击后原地展开编辑卡片
export default function AddTask({ defaults }: Props) {
	const actions = useTodoActions();
	const [open, setOpen] = useState(false);

	if (open) {
		return (
			<div className="py-1">
				<TaskEditor
					keepOpen
					initial={defaults}
					submitLabel="添加任务"
					onSubmit={(draft) => actions.add(draft)}
					onCancel={() => setOpen(false)}
				/>
			</div>
		);
	}

	return (
		<button type="button" className="add-task" onClick={() => setOpen(true)}>
			<span className="add-task-icon"><PlusOutlined /></span>
			添加任务
		</button>
	);
}
