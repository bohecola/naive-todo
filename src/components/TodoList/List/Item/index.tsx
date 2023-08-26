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
	// 输入数据
	const [inputValue, setInputValue] = useState<string>("");
	// TextArea 引用
	const TextAreaRef = useRef<TextAreaRef>(null);

	// 文本域点击切换 TextArea 编辑
	const handleTextAreaEdit = () => {
		// 更新当前活跃的 Todo ID
		updateCurId(todo.id);
		// TextArea 的绑定的值设置为当前点击 Todo 的内容
		setInputValue(todo.content);
	};

	useEffect(() => {
		// Todo 是未完成的状态时
		if (inputValue && !todo.completed) {
			// 实时更新当前所修改 Todo 的内容
			updateTodo({ ...todo,	content: inputValue });
		}
	}, [inputValue]);

	// TextArea 获取焦点
	useEffect(() => {
		if (TextAreaRef.current) {
			const cursorPausePosition = inputValue.length;
			TextAreaRef.current.resizableTextArea?.textArea.setSelectionRange(cursorPausePosition, cursorPausePosition);
			TextAreaRef.current.focus();
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
						ref={TextAreaRef}
						maxLength={200}
						value={inputValue.trim()}
						onChange={(e) => { setInputValue(e.target.value); }}
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
