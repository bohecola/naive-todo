import { useEffect, useState } from "react";
import List from "./List";
import TodoInput from "./Input";
import { useTodoList } from "./context";
import { Todo } from "@/types";
import BaseContainer from "../common/Container";

export default function TodoList() {
	const { todoList } = useTodoList();

	// 未完成列表
	const [unDoneList, setUnDoneList] = useState<Todo[]>([]);

	// 已完成列表
	const [doneList, setDoneList] = useState<Todo[]>([]);

	// 更新视图列表
	useEffect(() => {
		setUnDoneList(todoList.filter((item) => !item.completed));
		setDoneList(todoList.filter((item) => item.completed));
	}, [todoList]);

	return (
		<BaseContainer>
			<List
				title="任务列表"
				list={unDoneList}
				draggable
			/>

			{doneList.length > 0 && (<List
				title="已完成"
				list={doneList}
			/>)}
			<TodoInput />
		</BaseContainer>
	);
}
