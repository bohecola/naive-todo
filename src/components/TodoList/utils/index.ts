import { Todo } from "@/types";

export const store = {
	setTodoList: (todoList: Todo[]) => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	},
	getTodoList: (): Todo[] => {
		const todoList = localStorage.getItem("todoList");
		return todoList ? JSON.parse(todoList) : [];
	}
};
