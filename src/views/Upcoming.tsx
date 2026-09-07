import { ScheduleOutlined } from "@ant-design/icons";
import type { Todo } from "@/types";
import { useTodos } from "@/store/todos/context";
import { addDays, formatDayHeading, isBeforeToday } from "@/utils/date";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import Section from "@/components/TaskList/Section";
import AddTask from "@/components/TaskList/AddTask";

interface DayGroup {
	date: string;
	todos: Todo[];
}

export default function Upcoming() {
	const todos = useTodos();

	const { overdue, groups } = useMemo(() => {
		const overdueList: Todo[] = [];
		const byDate = new Map<string, Todo[]>();

		for (const todo of todos) {
			if (todo.completed || !todo.dueDate) continue;
			if (isBeforeToday(todo.dueDate)) {
				overdueList.push(todo);
				continue;
			}
			const list = byDate.get(todo.dueDate) ?? [];
			list.push(todo);
			byDate.set(todo.dueDate, list);
		}

		const grouped: DayGroup[] = [...byDate.entries()]
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([date, list]) => ({ date, todos: list }));

		return { overdue: overdueList, groups: grouped };
	}, [todos]);

	const isEmpty = overdue.length === 0 && groups.length === 0;

	return (
		<>
			<PageHeader title="即将到来" subtitle="按日期排列的所有已安排任务" />

			{overdue.length > 0 && (
				<Section title="逾期" count={overdue.length} todos={overdue} />
			)}

			{groups.map((group) => (
				<Section key={group.date} title={formatDayHeading(group.date)} todos={group.todos} />
			))}

			{isEmpty && (
				<EmptyState
					icon={<ScheduleOutlined />}
					title="还没有安排日期的任务"
					hint="给任务设置一个日期，它就会出现在这里。"
				/>
			)}

			<AddTask defaults={{ dueDate: addDays(1) }} />
		</>
	);
}
