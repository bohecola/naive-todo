import { InboxOutlined } from "@ant-design/icons";
import Item from "./Item";
import { Todo } from "@/types";

interface Props {
  title: string
	todoList: Todo[],
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
							/>
						))}
					</ul>)
					: <div className="mb-5 text-6xl text-center text-gray-300">
						<InboxOutlined />
					</div>}
		</div>
	);
}
