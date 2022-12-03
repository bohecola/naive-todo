import React from "react";
import { List } from "antd";
import TodoItem from "./Item";
import TodoInput from "./Input";
import { Todo } from "@/types";

interface Props {
	todoList: Todo[],
	addTodo(todo: Todo): void
	updateTodo(todo: Todo): void
	deleteTodo(id: string): void
}

export default function TodoList(props: Props) {
	return (
		<div className="naive-todo">
			<List
				header={<div>待办事项</div>}
				footer={<TodoInput addTodo={props.addTodo} />}
				bordered
				dataSource={props.todoList}
				renderItem={(item) => (
					<List.Item>
						<TodoItem
							key={item.id}
							{...item}
							updateTodo={props.updateTodo}
							deleteTodo={props.deleteTodo}
						/>
					</List.Item>
				)}
			/>
		</div>
	);
}
