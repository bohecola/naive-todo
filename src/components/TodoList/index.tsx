import { useEffect, useState } from "react";
import List from "./List";
import TodoInput from "./Input";
import { useTodo, useTodoDispatch } from "./context";
import { ActionType } from "./context/reducer";
import { Todo } from "@/types";

export default function TodoList() {
	const { todoList } = useTodo()!;

	const dispatch = useTodoDispatch();

	// 未完成列表
	const [unDoneList, setUnDoneList] = useState<Todo[]>([]);

	// 已完成列表
	const [doneList, setDoneList] = useState<Todo[]>([]);

	useEffect(() => {
		setUnDoneList(todoList.filter((item) => !item.completed));
		setDoneList(todoList.filter((item) => item.completed));
	}, [todoList]);


	// 挂载
	useEffect(() => {
		const initialTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
		if (initialTodoList.length) dispatch({ type: ActionType.UPDATE_TODO_LIST, payload: initialTodoList });
	}, []);

	return (
		<div className="p-10 bg-slate-800 border-2 rounded-lg border-slate-600">

			<List
				title="任务列表"
				list={unDoneList}
				className="mb-10"
				draggable
			/>

			{doneList.length > 0 && (<List
				title="已完成"
				list={doneList}
			/>)}
			<TodoInput />
		</div>
	);
}
