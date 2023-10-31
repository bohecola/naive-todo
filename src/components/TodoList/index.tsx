import { createContext, useEffect, useState } from "react";
import List from "./List";
import TodoInput from "./Input";
import { Todo } from "@/types";

interface TodoContextProps {
  curId: string
  updateCurId: (id: string) => void
  addTodo: (todo: Todo) => void
  updateTodo: (updatedTodo: Todo) => void
  deleteTodo: (id: string) => void
}

export const TodoContext = createContext<TodoContextProps>(null!);

export default function TodoList() {
	// 数据
	const [todoList, setTodoList] = useState<Todo[]>([]);
	// CurId
	const [curId, setCurId] = useState<string>("");

	// 更新当前操作的 CurId
	function updateCurId(id: string) {
		setCurId(id);
	}

	// 更新
	function update(newTodoList: Todo[]) {
		setTodoList(newTodoList);
		localStorage.setItem("todoList", JSON.stringify(newTodoList));
	}

	// 新增 Todo
	function addTodo(todo: Todo): void {
		const newTodoList = [todo, ...todoList];
		update(newTodoList);
	}

	// 修改 Todo
	function updateTodo(updatedTodo: Todo) {
		const newTodoList = todoList.map(todo => {
			return todo.id === updatedTodo.id
				? updatedTodo
				: todo;
		});
		update(newTodoList);
	}

	// 删除 Todo
	function deleteTodo(id: string) {
		const newTodoList = todoList.filter(todo => todo.id !== id);
		update(newTodoList);
	}

	// 挂载
	useEffect(() => {
		const todoList = JSON.parse(localStorage.getItem("todoList") as string);
		if (todoList && todoList.length) setTodoList(todoList);
	}, []);

	// 未完成
	const inCompleted = todoList.filter(todo => !todo.completed);
	// 已完成
	const completed = todoList.filter(todo => todo.completed);

	return (
		<TodoContext.Provider
			value={{
				curId,
				addTodo,
				updateTodo,
				deleteTodo,
				updateCurId
			}}>
			<div className="p-5 rounded border border-gray-300">
				<List
					title="任务列表"
					todoList={inCompleted}
				/>

				{completed.length > 0 && (<List
					title="已完成"
					todoList={completed}
				/>)}
				<TodoInput />
			</div>
		</TodoContext.Provider>
	);
}
