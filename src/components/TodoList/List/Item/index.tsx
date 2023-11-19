import { useContext, useEffect, useState } from "react";
import { Checkbox, Button, Input, Tag, Select, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Todo } from "@/types";
import { TodoContext } from "../..";
import { options } from "../../data";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface Props {
	todo: Todo
  deleteItem: (id: string) => void
  [key: string]: unknown
}

export default function Item(props: Props) {
	const { todo, deleteItem, ...otherProps } = props;

	const { curId, updateCurId, updateTodo, addTodo, addDone, deleteTodo, deleteDone } = useContext(TodoContext);

	const [inputValue, setInputValue] = useState<string>("");

	const [selectedValue, setSelectedValue] = useState<string[]>([]);

	// 编辑
	const handleEdit = () => {
		updateCurId(todo.id);
	};

	// 输入监听
	useEffect(() => {
		if (inputValue && !todo.completed) {
			// 未完成时更新
			updateTodo({ ...todo,	content: inputValue });
		}
	}, [inputValue]);

	// 挂载
	useEffect(() => {
		setSelectedValue(todo.type);
	}, []);

	// 更新状态
	const onCheckBoxChange = (e: CheckboxChangeEvent) => {
		const newTodo = {
			...todo,
			completed: e.target.checked
		};
		if (e.target.checked) {
			deleteTodo(todo.id);
			addDone(newTodo);
		} else {
			deleteDone(todo.id);
			addTodo(newTodo);
		}
	};

	// 类型选择
	const handleSelectChange = (val: string[]) => {
		updateTodo({
			...todo,
			type: val
		});
		setSelectedValue(val);
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
				{curId === todo.id
					?	(
						<Space.Compact onBlur={() => { updateCurId(""); }} className="flex w-[460px]">
							<Input
								className="mr-1 w-[300px]"
								autoFocus={true}
								maxLength={200}
								defaultValue={todo.content}
								onChange={(e) => { setInputValue(e.target.value); }}
								onPressEnter={() => { updateCurId(""); }}
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
					onClick={() => {deleteItem(todo.id);}}
				/>
			</div>
		</li>
	);
}
