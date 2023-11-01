import { KeyboardEvent, useContext, useState } from "react";
import { Input, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { Todo } from "@/types";
import { TodoContext } from "..";
import { options } from "../data";


export default function TodoInput() {
	// 数据
	const [inputValue, setInputValue] = useState<string>("");
	const [selectedValue, setSelectedValue] = useState<string[]>(["important"]);

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
			content: inputValue,			date: Date.now().toString(),
			type: selectedValue,
			completed: false
		};
		// 添加
		addTodo(todo);
		// 清空
		setInputValue("");
	}

	return (
		<div className="flex items-center">
			<Select
				className="w-[190px] mr-3"
				mode="multiple"
				maxTagCount={1}
				placeholder="任务类型"
				value={selectedValue}
				options={options}
				onChange={(val) => { setSelectedValue(val); }}
			/>
			<Input
				addonAfter={<SendOutlined onClick={submit}/>}
				maxLength={200}
				value={inputValue}
				onKeyUp={handleKeyUp}
				onChange={(e) => { setInputValue(e.target.value); }}
			/>
		</div>
	);
}
