import { Todo } from "@/types";

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
	todoList: []
};

const store = {
	setTodoList: (todoList: Todo[]) => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}
};

export function reducer(state: State, action: Action) {
	switch (action.type) {
		case ActionType.UPDATE_ACTIVE_ID:
			return { ...state, activeId: action.payload };
		case ActionType.ADD_TODO: {
			const todoList = [action.payload, ...state.todoList];
			store.setTodoList(todoList);
			return { ...state, todoList };
		}
		case ActionType.DELETE_TODO: {
			const todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
			store.setTodoList(todoList);
			return { ...state, todoList };
		}
		case ActionType.UPDATE_TODO: {
			const todoList = state.todoList.map(todo => todo.id === action.payload.id ? action.payload : todo);
			store.setTodoList(todoList);
			return { ...state, todoList  };
		}
		case ActionType.UPDATE_TODO_LIST: {
			store.setTodoList(action.payload);
			return { ...state, todoList: action.payload };
		}
		default:
			throw new Error("Unhandled action type");
	}
}
