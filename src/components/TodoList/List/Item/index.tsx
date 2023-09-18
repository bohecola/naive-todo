import { useEffect, useState } from "react";
import { Checkbox, Button, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Todo } from "@/types";

interface Props {
	curId: string
	todo: Todo
	updateTodo(todo: Todo): void
	deleteTodo(id: string): void
	updateCurId(id: string): void
}

export default function Item(props: Props) {
	const { curId, todo, updateCurId, updateTodo } = props;
	// 输入数据
	const [inputValue, setInputValue] = useState<string>("");

	// 编辑状态
	const handleEdit = () => {
		// 更新当前活跃的 Todo ID
		updateCurId(todo.id);
	};

	useEffect(() => {
		// Todo 是未完成的状态时
		if (inputValue && !todo.completed) {
			// 实时更新当前所修改 Todo 的内容
			updateTodo({ ...todo,	content: inputValue });
		}
	}, [inputValue]);

	// 更新 Todo 完成状态
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
				className={`mr-auto px-3 w-[calc(100%-6.25rem)] text-sm break-all ${todo.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
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
					onClick={() => {props.deleteTodo(todo.id);}}
				/>
			</div>
		</li>
	);
}
