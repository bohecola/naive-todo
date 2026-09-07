import type { PropsWithChildren } from "react";
import { Modal } from "antd";
import { useTodoActions } from "@/store/todos/context";
import TaskEditor from "../Task/TaskEditor";

const QuickAddContext = createContext<() => void>(() => undefined);

// 侧边栏「添加任务」和快捷键 q 共用的弹窗
export function QuickAddProvider({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const actions = useTodoActions();
	const show = useCallback(() => setOpen(true), []);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement | null;
			const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
			if (event.key === "q" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
				event.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	return (
		<QuickAddContext.Provider value={show}>
			{children}
			<Modal
				open={open}
				footer={null}
				closable={false}
				destroyOnHidden
				width={560}
				className="quick-add-modal"
				onCancel={() => setOpen(false)}
			>
				<TaskEditor
					submitLabel="添加任务"
					onSubmit={(draft) => {
						actions.add(draft);
						setOpen(false);
					}}
					onCancel={() => setOpen(false)}
				/>
			</Modal>
		</QuickAddContext.Provider>
	);
}

export function useQuickAdd() {
	return useContext(QuickAddContext);
}
