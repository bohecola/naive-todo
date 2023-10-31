import { KeyboardEvent, useContext, useState } from "react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { Todo } from "@/types";
import { TodoContext } from "..";

export default function TodoInput() {
	// 输入
	const [inputValue, setInputValue] = useState<string>("");
	// 上下文
	const { addTodo } = useContext(TodoContext);

	// 回车提交
	function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") return;
		submit();
	}

	// 提交
	function submit() {
		if (inputValue.trim() === "") return;
		// 数据
		const todo: Todo = {
			id: nanoid(),
			content: inputValue,
			date: Date.now().toString(),
			completed: false
		};
		// 添加
		addTodo(todo);
		// 清空
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
