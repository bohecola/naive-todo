import { Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useTodoList, useTodoListDispatch } from "../../context";
import { ActionType } from "../../context/reducer";
import { options } from "@/data";
import { Todo } from "@/types";

type Props = {
  todo: Todo;
}

export default function Content({ todo }: Props) {
	// 输入框数据
	const [inputValue, setInputValue] = useState<string>("");

	// 类型选择数据
	const [selectedValue, setSelectedValue] = useState<string[]>([]);

	// 活跃状态
	const { activeId } = useTodoList();

	// 派发器
	const dispatch = useTodoListDispatch();

	// 挂载
	useEffect(() => {
		setSelectedValue(todo.type);
	}, []);

	// 输入监听
	useEffect(() => {
		if (inputValue && !todo.completed) {
			// 未完成时更新
			dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, content: inputValue } });
		}
	}, [inputValue]);

	// 类型选择
	const handleSelectChange = (val: string[]) => {
		dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, type: val } });
		setSelectedValue(val);
	};

	// 清除活跃状态
	const clearActive = () => {
		dispatch({ type: ActionType.UPDATE_ACTIVE_ID, payload: "" });
	};

	return (
		<div
			className={`mr-auto px-3 text-sm break-all ${todo.completed ? "text-gray-400 line-through" : "text-white"}`}
			onClick={() => { dispatch({ type: ActionType.UPDATE_ACTIVE_ID, payload: todo.id }); }}>
			{activeId === todo.id
				?	(
					<Space.Compact onBlur={clearActive} className="flex w-[460px]">
						<Input
							className="mr-1 w-[300px]"
							autoFocus={true}
							maxLength={200}
							defaultValue={todo.content}
							onChange={(e) => { setInputValue(e.target.value); }}
							onPressEnter={clearActive}
						/>
						<Select
							mode="multiple"
							className="w-[160px]"
							value={selectedValue}
							options={options}
							maxTagCount={1}
							placeholder="任务类型"
							onChange={handleSelectChange}
							disabled={todo.completed}
						/>
					</Space.Compact>
				)
				:	todo.content}
		</div>
	);
}
