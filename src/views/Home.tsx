import TodoList from '@/components/TodoList'
import TodoListContextProvider from '@/components/TodoList/context'

export default function Home() {
	return (
		<div className="max-w-3xl mx-auto">
			<TodoListContextProvider>
				<TodoList />
			</TodoListContextProvider>
		</div>
	)
}
