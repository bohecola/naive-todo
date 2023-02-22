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
			<div className="naive-todo-title">{props.title}</div>
			{
				props.todoList.length > 0
					? (<ul className="naive-todo-list">
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
					: <div className="naive-todo-empty">
						<InboxOutlined />
					</div>}
		</div>
	);
}
