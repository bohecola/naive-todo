import { InboxOutlined } from "@ant-design/icons";
import Item from "./Item";
import { Todo } from "@/types";

interface Props {
	curId: string
  title: string
	todoList: Todo[],
	updateTodo(todo: Todo): void
	deleteTodo(id: string): void
	updateCurId(id: string): void
}

export default function List(props: Props) {
	return (
		<div>
			<div className="text-gray-500 font-bold mb-3">{props.title}</div>
			{
				props.todoList.length > 0
					? (<ul className="mb-5 max-h-[16rem] overflow-y-auto rounded border border-gray-300">
						{props.todoList.map(todo => (
							<Item
								key={todo.id}
								todo={todo}
								curId={props.curId}
								updateTodo={props.updateTodo}
								deleteTodo={props.deleteTodo}
								updateCurId={props.updateCurId}
							/>
						))}
					</ul>)
					: <div className="mb-5 text-6xl text-center text-gray-300">
						<InboxOutlined />
					</div>}
		</div>
	);
}
