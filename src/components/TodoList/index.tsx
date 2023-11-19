import { createContext, useEffect, useState } from "react";
import List from "./List";
import TodoInput from "./Input";
import { Todo } from "@/types";

interface TodoContextProps {
  curId: string
  updateCurId: (id: string) => void
  addTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
  updateTodo: (updatedTodo: Todo) => void
  updateTodoList: (newTodoList: Todo[]) => void
  addDone: (done: Todo) => void
  deleteDone: (id: string) => void
  updateDone: (updatedDone: Todo) => void
  updateDoneList: (newDoneList: Todo[]) => void
}

export const TodoContext = createContext<TodoContextProps>(null!);

export default function TodoList() {
	// 未完成
	const [todoList, setTodoList] = useState<Todo[]>([]);
	// 已完成
	const [doneList, setDoneList] = useState<Todo[]>([]);
	// CurId
	const [curId, setCurId] = useState<string>("");

	// 更新当前操作的 CurId
	function updateCurId(id: string) {
		setCurId(id);
	}

	// 新增 Todo
	function addTodo(todo: Todo) {
		updateTodoList([todo, ...todoList]);
	}

	// 删除 Todo
	function deleteTodo(id: string) {
		updateTodoList(todoList.filter(todo => todo.id !== id));
	}

	// 更新 Todo
	function updateTodo(updatedTodo: Todo) {
		updateTodoList(todoList.map(todo => {
			return todo.id === updatedTodo.id
				? updatedTodo
				: todo;
		}));
	}

	// 更新 TodoList
	function updateTodoList(newTodoList: Todo[]) {
		setTodoList(newTodoList);
		localStorage.setItem("todoList", JSON.stringify(newTodoList));
	}

	// 新增 Done
	function addDone(done: Todo) {
		updateDoneList([done, ...doneList]);
	}

	// 删除 Done
	function deleteDone(id: string) {
		updateDoneList(doneList.filter(done => done.id !== id));
	}

	// 更新 Done
	function updateDone(updatedDone: Todo) {
		updateDoneList(doneList.map(done => {
			return done.id === updatedDone.id
				? updatedDone
				: done;
		}));
	}

	// 更新 DoneList
	function updateDoneList(newDoneList: Todo[]) {
		setDoneList(newDoneList);
		localStorage.setItem("doneList", JSON.stringify(newDoneList));
	}

	// 挂载
	useEffect(() => {
		const initialTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
		const initialDoneList = JSON.parse(localStorage.getItem("doneList") || "[]");
		if (initialTodoList.length) setTodoList(initialTodoList);
		if (initialDoneList.length) setDoneList(initialDoneList);
	}, []);

	return (
		<TodoContext.Provider
			value={{
				curId,
				updateCurId,
				addTodo,
				updateTodo,
				deleteTodo,
				updateTodoList,
				addDone,
				updateDone,
				deleteDone,
				updateDoneList
			}}>
			<div className="p-10 bg-slate-800 border-2 rounded-lg border-slate-600">
				<List
					title="任务列表"
					list={todoList}
					className="mb-10"
					updateList={updateTodoList}
					deleteItem={deleteTodo}
					draggable
				/>

				{doneList.length > 0 && (<List
					title="已完成"
					list={doneList}
					updateList={updateDoneList}
					deleteItem={deleteDone}
				/>)}
				<TodoInput />
			</div>
		</TodoContext.Provider>
	);
}
