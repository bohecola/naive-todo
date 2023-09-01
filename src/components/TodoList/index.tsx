import { useEffect, useState } from "react";
import List from "./List";
import TodoInput from "./Input";
import { Todo } from "@/types";

export default function TodoList() {
	// 数据
	const [todoList, setTodoList] = useState<Todo[]>([]);
	// 当前操作的 Todo's CurId
	const [curId, setCurId] = useState<string>("");

	// 更新当前操作的 Todo's CurId
	function updateCurId(id: string) {
		setCurId(id);
	}

	// 新增 Todo
	function addTodo(todo: Todo): void {
		const newTodoList = [todo, ...todoList];
		update(newTodoList);
	}

	// 修改 Todo
	function updateTodo(updatedTodo: Todo) {
		const newTodoList = todoList.map(todo => {
			if (todo.id === updatedTodo.id) {
				return updatedTodo;
			}
			return todo;
		});
		update(newTodoList);
	}

	// 删除 Todo
	function deleteTodo(id: string) {
		const newTodoList = todoList.filter(todo => todo.id !== id);
		update(newTodoList);
	}

	// 设置 TodoList 数据以及持久化存储
	function update(newTodoList: Todo[]) {
		setTodoList(newTodoList);
		localStorage.setItem("todoList", JSON.stringify(newTodoList));
	}

	// 挂载时获取数据
	useEffect(() => {
		const todoList = JSON.parse(localStorage.getItem("todoList") as string);
		if (todoList && todoList.length) setTodoList(todoList);
	}, []);

	// 未完成
	const undone = todoList.filter(todo => !todo.completed);
	// 已完成
	const completed = todoList.filter(todo => todo.completed);

	return (
		<div className="p-5 rounded border border-gray-300">
			<List
				title="任务列表"
				curId={curId}
				todoList={undone}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				updateCurId={updateCurId}
			/>

			{completed.length > 0 && (<List
				title="已完成"
				curId={curId}
				todoList={completed}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				updateCurId={updateCurId}
			/>)}
			<TodoInput addTodo={addTodo} />
		</div>
	);
}
