import { useContext, useEffect, useState } from "react";
import { Checkbox, Button, Input, Tag, Select, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Todo } from "@/types";
import { TodoContext } from "../..";
import { options } from "../../data";

interface Props {
	todo: Todo
}

export default function Item(props: Props) {
	const { todo } = props;

	const { curId, updateCurId, updateTodo, deleteTodo } = useContext(TodoContext);

	const [inputValue, setInputValue] = useState<string>("");

	const [selectedValue, setSelectedValue] = useState<string[]>([]);

	// 编辑
	const handleEdit = () => {
		updateCurId(todo.id);
	};

	// 输入监听
	useEffect(() => {
		if (inputValue && !todo.completed) {
			// 更新
			updateTodo({ ...todo,	content: inputValue });
		}
	}, [inputValue]);

	// 挂载
	useEffect(() => {
		setSelectedValue(todo.type);
	}, []);

	// 更新状态
	const onCheckBoxChange = () => {
		updateTodo({
			...todo,
			completed: !todo.completed
		});
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
		<li className="flex items-center p-3 border-b border-gray-300 last:border-none">
			<Checkbox
				style={{ marginTop: "-4px" }}
				checked={todo.completed}
				onChange={onCheckBoxChange}
			/>

			<div
				className={`mr-auto px-3  text-sm break-all ${todo.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
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
							/>
						</Space.Compact>
					)
					:	todo.content}
			</div>

			<div>
				{todo.type.map((e) => {
					return (<Tag className="mr-1" key={e}>{
						options?.find((item) => item.value === e)?.label
					}</Tag>);
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
					onClick={() => {deleteTodo(todo.id);}}
				/>
			</div>
		</li>
	);
}
