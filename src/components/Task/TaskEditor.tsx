import type { KeyboardEvent } from "react";
import { Button, Input } from "antd";
import type { TodoDraft } from "@/types";
import { DEFAULT_PRIORITY } from "@/data";
import PriorityPicker from "./PriorityPicker";
import DueDatePicker from "./DueDatePicker";

interface Props {
	initial?: Partial<TodoDraft>;
	submitLabel: string;
	onSubmit: (draft: TodoDraft) => void;
	onCancel: () => void;
	/** 提交后是否清空以便连续添加 */
	keepOpen?: boolean;
}

// 新建和编辑共用的卡片：标题、备注、日期、优先级
export default function TaskEditor({ initial, submitLabel, onSubmit, onCancel, keepOpen }: Props) {
	const [content, setContent] = useState(initial?.content ?? "");
	const [note, setNote] = useState(initial?.note ?? "");
	const [priority, setPriority] = useState(initial?.priority ?? DEFAULT_PRIORITY);
	const [dueDate, setDueDate] = useState(initial?.dueDate);

	const canSubmit = content.trim().length > 0;

	const submit = () => {
		if (!canSubmit) return;
		onSubmit({ content, note, priority, dueDate });
		if (keepOpen) {
			setContent("");
			setNote("");
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === "Escape") {
			event.preventDefault();
			onCancel();
		}
		if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
			event.preventDefault();
			submit();
		}
	};

	return (
		<div className="task-editor" onKeyDown={handleKeyDown}>
			<Input
				autoFocus
				variant="borderless"
				className="editor-title"
				placeholder="任务名称"
				maxLength={200}
				value={content}
				onChange={(event) => setContent(event.target.value)}
			/>
			<Input.TextArea
				variant="borderless"
				className="editor-note"
				placeholder="备注"
				autoSize={{ minRows: 1, maxRows: 6 }}
				maxLength={1000}
				value={note}
				onChange={(event) => setNote(event.target.value)}
			/>
			<div className="flex flex-wrap items-center gap-2 px-3 pb-3">
				<DueDatePicker value={dueDate} onChange={setDueDate} />
				<PriorityPicker value={priority} onChange={setPriority} />
			</div>
			<div className="flex items-center justify-end gap-2 border-t border-line px-3 py-2.5">
				<Button onClick={onCancel}>取消</Button>
				<Button type="primary" disabled={!canSubmit} onClick={submit}>{submitLabel}</Button>
			</div>
		</div>
	);
}
