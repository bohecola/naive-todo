import { useEffect, useRef, useState } from "react";
import { Checkbox, Button, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Todo } from "@/types";
import { TextAreaRef } from "antd/es/input/TextArea";
import "./index.scss";

const { TextArea } = Input;

interface Props {
	curId: string
	todo: Todo
	updateTodo(todo: Todo): void
	deleteTodo(id: string): void
	updateCurId(id: string): void
}

export default function Item(props: Props) {
	const { curId, todo, updateCurId, updateTodo } = props;
	// 数据
	const [val, setVal] = useState<string>("");
	// TextArea 节点
	const TextAreaEl = useRef<TextAreaRef>(null);

	// 文本域点击切换 TextArea 编辑
	const handleTextAreaEdit = () => {
		updateCurId(todo.id);
		setVal(todo.content);
	};

	// 更新 Todo 数据
	useEffect(() => {
		if (val && !todo.completed) updateTodo({ ...todo,	content: val });
	}, [val]);

	// TextAreaE 获取焦点
	useEffect(() => {
		if (TextAreaEl.current) {
			TextAreaEl.current.focus();
		}
	}, [curId]);

	// 更新 Todo 完成状态
	const onCheckBoxChange = () => {
		updateTodo({
			...todo,
			completed: !todo.completed
		});
	};

	return (
		<li className="naive-todo-item">
			<Checkbox
				style={{ marginTop: "-4px" }}
				checked={todo.completed}
				onChange={onCheckBoxChange}
			/>

			<div
				className={`content ${todo.completed ? "completed" : ""}`}
				onClick={handleTextAreaEdit}>
				{curId === todo.id
					?	(<TextArea
						ref={TextAreaEl}
						maxLength={200}
						value={val.trim()}
						onChange={(e) => { setVal(e.target.value); }}
						onBlur={() => { updateCurId(""); }}
						onPressEnter={() => { updateCurId(""); }}
						autoSize={{ minRows: 1, maxRows: 3 }}
					/>)
					:	todo.content}
			</div>

			<div className="other-btn">
				<Button
					icon={ <EditOutlined /> }
					shape="circle"
					size="small"
					onClick={handleTextAreaEdit}
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
