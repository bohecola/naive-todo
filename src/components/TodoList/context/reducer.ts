import { Todo } from "@/types";
import { store } from "../utils";

export type State = {
  activeId: string;
  todoList: Todo[];
}

export enum ActionType {
  UPDATE_ACTIVE_ID = "UPDATE_ACTIVE_ID",
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  UPDATE_TODO_LIST = "UPDATE_TODO_LIST",
}

type ActiveAction = {
  type: ActionType.UPDATE_ACTIVE_ID;
  payload: string;
}

type TodoAction = {
  type: ActionType.ADD_TODO | ActionType.DELETE_TODO | ActionType.UPDATE_TODO
  payload: Todo;
}

type TodoListAction = {
  type: ActionType.UPDATE_TODO_LIST;
  payload: Todo[];
}

export type Action = ActiveAction | TodoAction | TodoListAction;

export const initialState: State = {
	activeId: "",
	todoList: store.getTodoList()
};

export function reducer(state: State, action: Action) {
	let todoList: Todo[];

	switch (action.type) {
		case ActionType.UPDATE_ACTIVE_ID:
			return { ...state, activeId: action.payload };
		case ActionType.ADD_TODO: {
			todoList = [action.payload, ...state.todoList];
			break;
		}
		case ActionType.DELETE_TODO: {
			todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
			break;
		}
		case ActionType.UPDATE_TODO: {
			todoList = state.todoList.map(todo => todo.id === action.payload.id ? action.payload : todo);
			break;
		}
		case ActionType.UPDATE_TODO_LIST: {
			todoList = action.payload;
		}
	}

	if (todoList !== undefined) {
		store.setTodoList(todoList);
		return { ...state, todoList };
	}

	return state;
}
