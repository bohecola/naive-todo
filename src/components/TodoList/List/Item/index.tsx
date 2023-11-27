import { useEffect, useState } from "react";
import { Checkbox, Button, Input, Tag, Select, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { options } from "../../data";
import { useTodoList, useTodoListDispatch } from "../../context";
import { ActionType } from "../../context/reducer";
import { Todo } from "@/types";

interface Props {
	todo: Todo
  [key: string]: unknown
}

export default function Item(props: Props) {
	const { todo, ...otherProps } = props;

	// 输入框数据
	const [inputValue, setInputValue] = useState<string>("");

	// 类型选择数据
	const [selectedValue, setSelectedValue] = useState<string[]>([]);

	// 活跃状态
	const { activeId } = useTodoList();

	// 派发器
	const dispatch = useTodoListDispatch();

	// 编辑
	const handleEdit = () => {
		dispatch({ type: ActionType.UPDATE_ACTIVE_ID, payload: todo.id });
	};

	// 输入监听
	useEffect(() => {
		if (inputValue && !todo.completed) {
			// 未完成时更新
			dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, content: inputValue } });
		}
	}, [inputValue]);

	// 挂载
	useEffect(() => {
		setSelectedValue(todo.type);
	}, []);

	// 更新状态
	const onCheckBoxChange = (e: CheckboxChangeEvent) => {
		dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, completed: e.target.checked } });
	};

	// 类型选择
	const handleSelectChange = (val: string[]) => {
		dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, type: val } });
		setSelectedValue(val);
	};

	// 清除活跃状态
	const clearActive = () => {
		dispatch({ type: ActionType.UPDATE_ACTIVE_ID, payload: "" });
	};

	// 删除
	const remove = () => {
		dispatch({ type: ActionType.DELETE_TODO, payload: todo });
	};

	return (
		<li
			{...otherProps}
			className="flex items-center p-3 mb-2 bg-slate-600/75 text-white rounded last:mb-0"
		>

			<div className="p-1 mx-2 hover:bg-slate-600">
        ⋮⋮
			</div>

			<Checkbox
				checked={todo.completed}
				onChange={onCheckBoxChange}
			/>

			<div
				className={`mr-auto px-3 text-sm break-all ${todo.completed ? "text-gray-400 line-through" : "text-white"}`}
				onClick={handleEdit}>
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

			<div className="mr-4">
				{todo.type.map((e) => {
					return (
						<Tag
							className="mr-1 last:mr-0 bg-slate-700 text-gray-200"
							bordered={false}
							key={e}>{
								options?.find((item) => item.value === e)?.label
							}
						</Tag>
					);
				})}
			</div>

			<div className="flex justify-between w-14">
				<Button
					icon={ <EditOutlined /> }
					shape="circle"
					size="small"
					onClick={handleEdit}
				/>
				<Button
					icon={ <DeleteOutlined /> }
					shape="circle"
					size="small"
					onClick={remove}
				/>
			</div>
		</li>
	);
}
