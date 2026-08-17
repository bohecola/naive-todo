import { Todo } from "@/types";
import { initialTodoList } from "@/data";

export const store = {
	setTodoList: (todoList: Todo[]) => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	},
	getTodoList: (): Todo[] => {
		const todoList = localStorage.getItem("todoList");
		return todoList ? JSON.parse(todoList) : initialTodoList;
	}
};

// 时间戳格式化（YYYY-MM-DD HH:mm）
export function formatDate(timestamp: string): string {
	const date = new Date(Number(timestamp));
	if (isNaN(date.getTime())) return "";
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
