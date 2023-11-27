import { KeyboardEvent, useState } from "react";
import { Input, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { Todo } from "@/types";
import { options } from "../data";
import { useTodoListDispatch } from "../context";
import { ActionType } from "../context/reducer";

export default function TodoInput() {
	// 数据
	const [inputValue, setInputValue] = useState<string>("");
	const [selectedValue, setSelectedValue] = useState<string[]>(["important"]);

	// 派发器
	const dispatch = useTodoListDispatch();

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
			type: selectedValue,
			completed: false
		};

		// 添加
		dispatch({ type: ActionType.ADD_TODO, payload: todo });

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
