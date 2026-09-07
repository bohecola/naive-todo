import type { Todo } from "@/types";

export type Action =
	| { type: "add"; todo: Todo; index?: number }
	| { type: "update"; id: string; patch: Partial<Omit<Todo, "id">> }
	| { type: "toggle"; id: string; completed: boolean }
	| { type: "remove"; id: string }
	| { type: "reorder"; fromId: string; toId: string }
	| { type: "clearCompleted" }
	| { type: "replace"; todos: Todo[] };

export function todosReducer(todos: Todo[], action: Action): Todo[] {
	switch (action.type) {
		case "add": {
			const next = [...todos];
			const index = action.index ?? next.length;
			next.splice(Math.min(index, next.length), 0, action.todo);
			return next;
		}
		case "update":
			return todos.map((todo) => (todo.id === action.id ? { ...todo, ...action.patch } : todo));
		case "toggle":
			return todos.map((todo) => {
				if (todo.id !== action.id) return todo;
				const next: Todo = { ...todo, completed: action.completed };
				if (action.completed) next.completedAt = Date.now();
				else delete next.completedAt;
				return next;
			});
		case "remove":
			return todos.filter((todo) => todo.id !== action.id);
		case "reorder": {
			if (action.fromId === action.toId) return todos;
			const fromIndex = todos.findIndex((todo) => todo.id === action.fromId);
			const toIndex = todos.findIndex((todo) => todo.id === action.toId);
			if (fromIndex === -1 || toIndex === -1) return todos;
			const next = [...todos];
			const [moved] = next.splice(fromIndex, 1);
			next.splice(toIndex, 0, moved);
			return next;
		}
		case "clearCompleted":
			return todos.filter((todo) => !todo.completed);
		case "replace":
			return action.todos;
		default:
			return todos;
	}
}
