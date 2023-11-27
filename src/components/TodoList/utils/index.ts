import { Todo } from "@/types";
import { initialTodoList } from "../data";

export const store = {
	setTodoList: (todoList: Todo[]) => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	},
	getTodoList: (): Todo[] => {
		const todoList = localStorage.getItem("todoList");
		return todoList ? JSON.parse(todoList) : initialTodoList;
	}
};
