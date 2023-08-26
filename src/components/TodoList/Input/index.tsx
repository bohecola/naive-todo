import { KeyboardEvent, useState } from "react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { Todo } from "@/types";

interface Props {
  addTodo(todo: Todo): void
}

export default function TodoInput(props: Props) {
	// 数据
	const [inputValue, setInputValue] = useState<string>("");

	// 回车提交
	function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") return;
		submit();
	}

	// 提交
	function submit() {
		if (inputValue.trim() === "") return;
		const todo: Todo = {
			id: nanoid(),
			content: inputValue,
			date: Date.now().toString(),
			completed: false
		};
		props.addTodo(todo);
		setInputValue("");
	}

	return (
		<Input
			addonBefore={<SendOutlined onClick={submit}/>}
			maxLength={200}
			value={inputValue}
			onKeyUp={handleKeyUp}
			onChange={(e) => { setInputValue(e.target.value); }}
		/>
	);
}
