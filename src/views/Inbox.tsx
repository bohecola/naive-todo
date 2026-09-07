import { InboxOutlined } from "@ant-design/icons";
import { useTodos } from "@/store/todos/context";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import Section from "@/components/TaskList/Section";
import AddTask from "@/components/TaskList/AddTask";
import CompletedSection from "@/components/TaskList/CompletedSection";

export default function Inbox() {
	const todos = useTodos();
	const active = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
	const completed = useMemo(() => todos.filter((todo) => todo.completed), [todos]);

	return (
		<>
			<PageHeader title="收件箱" />
			<Section todos={active} sortable>
				{active.length === 0 && (
					<EmptyState
						icon={<InboxOutlined />}
						title="收件箱空空如也"
						hint="把想到的事先记在这里，之后再安排日期。"
					/>
				)}
				<AddTask />
			</Section>
			<CompletedSection todos={completed} clearable />
		</>
	);
}
