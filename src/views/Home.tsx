import TodoListContextProvider from "@/components/TodoList/context";
import TodoList from "@/components/TodoList";

export default function Home() {
	return (
		<div className="max-w-3xl mx-auto">
			<TodoListContextProvider>
			  <TodoList />
			</TodoListContextProvider>
		</div>
	);
}
