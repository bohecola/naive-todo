import { createContext, useContext, useReducer, Dispatch, ReactNode } from "react";
import { State, Action, reducer, initialState } from "./reducer";

// TodoList 上下文
const TodoListContext = createContext<State>(null!);
const TodoListDispatchContext = createContext<Dispatch<Action>>(null!);

// TodoList 上下文提供器
export default function TodoListContextProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<TodoListContext.Provider value={state}>
			<TodoListDispatchContext.Provider value={dispatch}>
				{children}
			</TodoListDispatchContext.Provider>
		</TodoListContext.Provider>
	);
}

// 用于获取 state
export function useTodoList() {
	return useContext(TodoListContext);
}

// 用于获取 dispatch
export function useTodoListDispatch() {
	return useContext(TodoListDispatchContext);
}
