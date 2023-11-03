import Title from "./Title";
import Item from "./Item";
import Empty from "./empty";
import { Todo } from "@/types";
import { DragEvent, useContext, useEffect, useRef } from "react";
import { TodoContext } from "..";

interface Props {
  title: string
	todoList: Todo[],
}

export default function List(props: Props) {
	const { update } = useContext(TodoContext);

	const { title, todoList } = props;

	// 不为空
	const isNotEmpty = todoList.length > 0;

	// 拖拽元素索引
	const dragItem = useRef<any>(null);
	// 进入元素索引
	const dragOverItem = useRef<any>(null);

	// 拖拽开始
	const handleDragStart = (e: DragEvent, index: number) => {
		dragItem.current = index;
		e.dataTransfer.effectAllowed = "move";
	};

	// 拖拽进入
	const handleDragEnter = (e: DragEvent, index: number) => {
		e.preventDefault();
		dragOverItem.current = index;

		const target = e.target as HTMLElement;

		target.classList.add(...["!bg-black/25"]);
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
		// 拷贝
		const _todoList = [...todoList];

		// 删除
		const [draggedItemContent] = _todoList.splice(dragItem.current, 1);

		// 插入
		_todoList.splice(dragOverItem.current, 0, draggedItemContent);

		dragItem.current = null;
		dragOverItem.current = null;

		// 更新
		update(_todoList);
	};

	return (
		<div>
			<Title>{title}</Title>
			{
				isNotEmpty
					? (
						<ul
							className="mb-5 max-h-[16rem] overflow-y-auto border-gray-300">
							{todoList.map((todo, index) => (
								<Item
									draggable
									key={todo.id}
									todo={todo}
									onDragStart={(e: DragEvent) => handleDragStart(e, index)}
									onDragEnter={(e: DragEvent) => handleDragEnter(e, index)}
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
