import DragButton from "./DragBtn";
import Check from "./Check";
import Tags from "./Tags";
import Content from "./Content";
import DeleteBtn from "./DeleteBtn";
import { Todo } from "@/types";

interface Props {
	todo: Todo;
  draggable?: boolean;
  draggedItem?: Todo;
  dragOverItem?: Todo;
  todoList: Todo[];
  updateDraggedItem: (todo: Todo | undefined) => void;
  updateDragOverItem: (todo: Todo | undefined) => void;
  updateTodoList: (todoList: Todo[]) => void;
  [key: string]: unknown;
}

export default function Item(props: Props) {
	let index = 0;
	index ++;

	const {
		todo,
		draggable,
		draggedItem,
		dragOverItem,
		todoList,
		updateDraggedItem,
		updateDragOverItem,
		updateTodoList
	} = props;

	// 拖拽开始
	const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
		e.dataTransfer.effectAllowed = "move";
		updateDraggedItem(todo);
	};

	// 拖拽进入
	const handleDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
		// e.preventDefault();
		updateDragOverItem(todo);
	};

	// 拖拽结束
	const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
		// 拷贝一份
		const _todoList = [...todoList];
		// 拖拽元素的索引
		const draggedIndex = _todoList.findIndex((item) => item.id === draggedItem?.id);
		// 目标元素的索引
		const dragOverIndex = _todoList.findIndex((item) => item.id === dragOverItem?.id);

		// 删除
		const [draggedTodo] = _todoList.splice(draggedIndex, 1);
		// 插入
		_todoList.splice(dragOverIndex, 0, draggedTodo);

		// 重置状态
		updateDraggedItem(undefined);
		updateDragOverItem(undefined);

		// 更新列表
		updateTodoList(_todoList);
	};

	return (
		<li
			draggable={draggable}
			className={`
        flex items-center p-3 mb-2 bg-slate-600/75 text-white rounded last:mb-0
        hover:opacity-80 cursor-grab
        ${draggedItem?.id === todo.id ? "!cursor-grabbing" : ""}
        ${(dragOverItem?.id === todo.id && !todo.completed) ? "!bg-black/25" : ""}`
			}
			onDragStart={(e) => handleDragStart(e)}
			onDragEnter={(e) => handleDragEnter(e)}
			onDragEnd={(e) => handleDragEnd(e)}
			onDragOver={(e) => {e.preventDefault();  e.dataTransfer.dropEffect = "move";}}
		>
			{/* <DragButton /> */}
			<Check todo={todo} />
			<Content todo={todo} />
			<Tags todo={todo} />
			<DeleteBtn todo={todo} />
		</li>
	);
}
