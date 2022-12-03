import React from "react";
import { Checkbox } from "antd";
import { Todo } from "@/types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface Props extends Todo {
	updateTodo(todo: Todo): void
	deleteTodo(id: string): void
}

export default function Item(props: Props) {
	const { id, content, date, completed } = props;

	const onChange = (event: CheckboxChangeEvent) => {
		const todo: Todo = {
			id: id,
			content: content,
			date: date,
			completed: !completed
		};
		props.updateTodo(todo);
	};

	return (
		<div className="naive-todo-item">
			<Checkbox checked={completed} onChange={onChange}>
				<div className="content">{content}</div>
			</Checkbox>
		</div>
	);
}
