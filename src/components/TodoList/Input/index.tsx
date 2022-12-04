import React, { KeyboardEvent, useState } from "react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { Todo } from "@/types";

interface Props {
  addTodo(todo: Todo): void
}

export default function TodoInput(props: Props) {
	// 数据
	const [val, setVal] = useState<string>("");

	// 回车提交
	function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") return;
		submit();
	}

	// 提交
	function submit() {
		if (val.trim() === "") return;
		const todo: Todo = {
			id: nanoid(),
			content: val,
			date: Date.now().toString(),
			completed: false
		};
		props.addTodo(todo);
		setVal("");
	}

	return (
		<Input
			addonBefore={<SendOutlined onClick={submit}/>}
			maxLength={200}
			value={val}
			onKeyUp={handleKeyUp}
			onChange={(e) => { setVal(e.target.value); }}
		/>
	);
}
