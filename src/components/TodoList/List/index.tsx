import Title from "./Title";
import Item from "./Item";
import Empty from "./empty";
import { Todo } from "@/types";
import { DragEvent, useRef } from "react";

interface Props {
  title: string
	list: Todo[],
  draggable?: boolean
  className?: string
  updateList: (newList: Todo[]) => void
  deleteItem: (id: string) => void
}

export default function List(props: Props) {
	const { title, list, updateList, deleteItem, draggable, className } = props;

	// 不为空
	const isNotEmpty = list.length > 0;

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
		const _list = [...list];

		// 删除
		const [draggedItemContent] = _list.splice(dragItem.current, 1);

		// 插入
		_list.splice(dragOverItem.current, 0, draggedItemContent);

		dragItem.current = null;
		dragOverItem.current = null;

		// 更新
		updateList(_list);
	};

	return (
		<div>
			<Title>{title}</Title>
			{
				isNotEmpty
					? (
						<ul
							className={`${className} border-slate-600 mb-5`}>
							{list.map((todo, index) => (
								<Item
									draggable={draggable}
									key={todo.id}
									todo={todo}
									deleteItem={deleteItem}
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
