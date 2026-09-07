import Layout from "@/layout";
import { TodosProvider } from "@/store/todos/context";

function App() {
	return (
		<TodosProvider>
			<Layout />
		</TodosProvider>
	);
}

export default App;
