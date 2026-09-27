import type { Dispatch, PropsWithChildren } from 'react'
import type { Action, State } from './reducer'
import { initialState, reducer } from './reducer'

// Context 与配套 hooks 同文件维护是 React 的惯用写法
/* eslint-disable react-refresh/only-export-components */

// TodoList 上下文
const TodoListContext = createContext<State>(null!)
const TodoListDispatchContext = createContext<Dispatch<Action>>(null!)

// TodoList 上下文提供器
export default function TodoListContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<TodoListContext value={state}>
			<TodoListDispatchContext value={dispatch}>
				{children}
			</TodoListDispatchContext>
		</TodoListContext>
	)
}

// 用于获取 state
export function useTodoList() {
	return use(TodoListContext)
}

// 用于获取 dispatch
export function useTodoListDispatch() {
	return use(TodoListDispatchContext)
}
