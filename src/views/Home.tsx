import React, { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types";

export default function Home() {
	const [todoList, setTodoList] = useState<Todo[]>([]);

	function addTodo(todo: Todo): void {
		setTodoList([todo, ...todoList]);
	}

	function deleteTodo(id: string) {
		setTodoList(todoList.filter(todo => todo.id !== id));
	}

	function updateTodo(updatedTodo: Todo) {
		setTodoList(todoList.map(todo => {
			if (todo.id === updatedTodo.id) {
				return updatedTodo;
			}
			return todo;
		}));
	}

	useEffect(() => {
		if (todoList.length) {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		} else {
			const todoList = JSON.parse(localStorage.getItem("todoList") as string);
			if (todoList) setTodoList(todoList);
		}
	}, [todoList]);

	return (
		<div className="page-home">
			<TodoList
				todoList={todoList}
				addTodo={addTodo}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}
