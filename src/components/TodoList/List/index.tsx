import { useState } from "react";
import Title from "./Title";
import Item from "./Item";
import Empty from "./empty";
import { Todo } from "@/types";
import { useTodoList, useTodoListDispatch } from "../context";
import { ActionType } from "../context/reducer";

interface Props {
  title: string
	list: Todo[],
  draggable?: boolean
}

export default function List(props: Props) {
	const { title, list, draggable } = props;
	// 数据
	const { todoList } = useTodoList();

	// 派发器
	const dispatch = useTodoListDispatch();

	// Drag 元素
	const [draggedItem, setDraggedItem] = useState<Todo>();
	// DragOver 元素
	const [dragOverItem, setDragOverItem] = useState<Todo>();

	// 状态提升
	const otherProps = {
		draggedItem,
		dragOverItem,
		todoList,
		// 设置 Dragged 元素
		updateDraggedItem: (todo: Todo | undefined) => {
			setDraggedItem(todo);
		},
		// 更新 DragOver 元素
		updateDragOverItem: (todo: Todo | undefined) => {
			setDragOverItem(todo);
		},
		// 更新列表
		updateTodoList: (todoList: Todo[]) => {
			dispatch({ type: ActionType.UPDATE_TODO_LIST, payload: todoList });
		}
	};

	return (
		<div>
			<Title>{title}</Title>
			{
				list.length > 0
					? (
						<ul
							className="mb-5 p-0 border-slate-600">
							{list.map((todo, index) => (
								<Item
									draggable={draggable}
									key={todo.id}
									todo={todo}
									{...otherProps}
								/>
							))}
						</ul>)
					: <Empty />
			}
		</div>
	);
}
