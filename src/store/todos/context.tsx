import type { Dispatch, PropsWithChildren } from "react";
import { App } from "antd";
import { nanoid } from "nanoid";
import type { Todo, TodoDraft } from "@/types";
import { todosReducer, type Action } from "./reducer";
import { loadTodos, saveTodos } from "./storage";

const TodosContext = createContext<Todo[]>([]);
const TodosDispatchContext = createContext<Dispatch<Action>>(() => undefined);

type ProviderProps = PropsWithChildren<{
	/** 测试时注入初始数据，跳过 localStorage */
	initialTodos?: Todo[];
}>;

export function TodosProvider({ children, initialTodos }: ProviderProps) {
	const [todos, dispatch] = useReducer(todosReducer, initialTodos, (init) => init ?? loadTodos());

	// 持久化放在 effect 里，reducer 保持纯函数
	useEffect(() => {
		saveTodos(todos);
	}, [todos]);

	return (
		<TodosContext.Provider value={todos}>
			<TodosDispatchContext.Provider value={dispatch}>
				{children}
			</TodosDispatchContext.Provider>
		</TodosContext.Provider>
	);
}

export function useTodos(): Todo[] {
	return useContext(TodosContext);
}

export function useTodosDispatch(): Dispatch<Action> {
	return useContext(TodosDispatchContext);
}

/** 常用操作的封装，删除自带撤销提示 */
export function useTodoActions() {
	const todos = useTodos();
	const dispatch = useTodosDispatch();
	const { message } = App.useApp();

	return useMemo(() => ({
		add(draft: TodoDraft): Todo {
			const todo: Todo = {
				id: nanoid(),
				content: draft.content.trim(),
				priority: draft.priority,
				completed: false,
				createdAt: Date.now()
			};
			if (draft.note?.trim()) todo.note = draft.note.trim();
			if (draft.dueDate) todo.dueDate = draft.dueDate;
			dispatch({ type: "add", todo });
			return todo;
		},
		update(id: string, draft: TodoDraft) {
			dispatch({
				type: "update",
				id,
				patch: {
					content: draft.content.trim(),
					note: draft.note?.trim() || undefined,
					priority: draft.priority,
					dueDate: draft.dueDate || undefined
				}
			});
		},
		toggle(id: string, completed: boolean) {
			dispatch({ type: "toggle", id, completed });
		},
		remove(todo: Todo) {
			const index = todos.findIndex((item) => item.id === todo.id);
			dispatch({ type: "remove", id: todo.id });

			const key = `undo-${todo.id}`;
			message.open({
				key,
				type: "success",
				duration: 8,
				content: (
					<span className="inline-flex items-center gap-3">
						<span>已删除「{todo.content}」</span>
						<button
							type="button"
							className="undo-btn"
							onClick={() => {
								dispatch({ type: "add", todo, index: index === -1 ? undefined : index });
								message.destroy(key);
							}}
						>
							撤销
						</button>
					</span>
				)
			});
		},
		reorder(fromId: string, toId: string) {
			dispatch({ type: "reorder", fromId, toId });
		},
		clearCompleted() {
			dispatch({ type: "clearCompleted" });
		}
	}), [todos, dispatch, message]);
}
