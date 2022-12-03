import React, { KeyboardEvent, useState } from "react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { Todo } from "@/types";

interface Props {
  addTodo(todo: Todo): void
}

export default function TodoInput(props: Props) {
	const [content, setContent] = useState<string>("");

	function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") return;
		submit();
	}

	function submit() {
		if (content.trim() === "") return;
		const todo: Todo = {
			id: nanoid(),
			content: content,
			date: Date.now().toString(),
			completed: false
		};
		props.addTodo(todo);
		setContent("");
	}

	return (
		<Input
			addonBefore={<SendOutlined onClick={submit}/>}
			value={content}
			onKeyUp={handleKeyUp}
			onChange={(e) => { setContent(e.target.value); }}
		/>
	);
}
