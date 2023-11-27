import Title from "./Title";
import Item from "./Item";
import Empty from "./empty";
import { Todo } from "@/types";
import { DragEvent, useRef } from "react";
import { useTodoList, useTodoListDispatch } from "../context";
import { ActionType } from "../context/reducer";

interface Props {
  title: string
	list: Todo[],
  draggable?: boolean
  className?: string
}

export default function List(props: Props) {
	const { title, list, draggable, className } = props;

	// 数据
	const { todoList } = useTodoList()!;

	// 派发器
	const dispatch = useTodoListDispatch();

	// 不为空
	const isNotEmpty = list.length > 0;

	// 拖拽元素索引
	const dragItem = useRef<any>(null);
	// 进入元素索引
	const dragOverItem = useRef<any>(null);

	// 拖拽开始
	const handleDragStart = (e: DragEvent, id: string) => {
		dragItem.current = id;
		e.dataTransfer.effectAllowed = "move";
	};

	// 拖拽进入
	const handleDragEnter = (e: DragEvent, id: string) => {
		e.preventDefault();
		const target = e.target as HTMLElement;
		target.classList.add(...["!bg-black/25"]);

		dragOverItem.current = id;
	};

	// 拖拽离开
	const handleDragLeave = (e: DragEvent) => {
		const target = e.target as HTMLElement;
		target.classList.remove(...["!bg-black/25"]);
	};

	// 拖拽释放
	const handleDrop = (e: DragEvent) => {
		const target = e.target as HTMLElement;
		target.classList.remove(...["!bg-black/25"]);
	};

	// 拖拽结束
	const handleDragEnd = (e: DragEvent) => {
		// 拷贝一份
		const _todoList = [...todoList];

		// 被拖拽的 Todo 索引
		const draggedTodoIdx = _todoList.findIndex((item) => item.id === dragItem.current);

		// Over 的 Todo 索引
		const dragOverTodoIdx = _todoList.findIndex((item) => item.id === dragOverItem.current);

		// 删除
		const [draggedTodo] = _todoList.splice(draggedTodoIdx, 1);

		// 插入
		_todoList.splice(dragOverTodoIdx, 0, draggedTodo);

		dragItem.current = null;
		dragOverItem.current = null;

		// 更新
		dispatch({ type: ActionType.UPDATE_TODO_LIST, payload: _todoList });
	};

	return (
		<div>
			<Title>{title}</Title>
			{
				isNotEmpty
					? (
						<ul
							className={`${className} mb-5 p-0 border-slate-600`}>
							{list.map((todo, index) => (
								<Item
									draggable={draggable}
									key={todo.id}
									todo={todo}
									onDragStart={(e: DragEvent) => handleDragStart(e, todo.id)}
									onDragEnter={(e: DragEvent) => handleDragEnter(e, todo.id)}
									onDragLeave={handleDragLeave}
									onDragEnd={handleDragEnd}
									onDrop={handleDrop}
									onDragOver={(e: DragEvent) => e.preventDefault()}
								/>
							))}
						</ul>
					)
					: <Empty />
			}
		</div>
	);
}
