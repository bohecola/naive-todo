import { useContext, useEffect, useState } from "react";
import { Checkbox, Button, Input, Tag } from "antd";
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

	// 编辑
	const handleEdit = () => {
		updateCurId(todo.id);
	};

	useEffect(() => {
		if (inputValue && !todo.completed) {
			// 更新
			updateTodo({ ...todo,	content: inputValue });
		}
	}, [inputValue]);

	// 更新状态
	const onCheckBoxChange = () => {
		updateTodo({
			...todo,
			completed: !todo.completed
		});
	};

	return (
		<li className="flex items-center p-3 border-b border-gray-300 last:border-none">
			<Checkbox
				style={{ marginTop: "-4px" }}
				checked={todo.completed}
				onChange={onCheckBoxChange}
			/>

			<div
				className={`mr-auto px-3 min-w-[60%] text-sm break-all ${todo.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
				onClick={handleEdit}>
				{curId === todo.id
					?	(
						<Input
							autoFocus={true}
							maxLength={200}
							defaultValue={todo.content}
							onChange={(e) => { setInputValue(e.target.value); }}
							onBlur={() => { updateCurId(""); }}
							onPressEnter={() => { updateCurId(""); }}
						/>
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
