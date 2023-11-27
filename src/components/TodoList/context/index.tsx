import { createContext, useContext, useReducer, Dispatch, ReactNode } from "react";
import { State, Action, reducer, initialState } from "./reducer";

const TodoListContext = createContext<State>(null!);

const TodoListDispatchContext = createContext<Dispatch<Action>>(null!);

export default function TodoListContextProvider({ children }: { children: ReactNode }) {
	const [context, dispatch] = useReducer(reducer, initialState);

	return (
		<TodoListContext.Provider value={context}>
			<TodoListDispatchContext.Provider value={dispatch}>
				{children}
			</TodoListDispatchContext.Provider>
		</TodoListContext.Provider>
	);
}

export function useTodo() {
	return useContext(TodoListContext);
}

export function useTodoDispatch() {
	return useContext(TodoListDispatchContext);
}
