import dayjs from "dayjs";
import { CoffeeOutlined } from "@ant-design/icons";
import { useTodos } from "@/store/todos/context";
import { WEEKDAYS, isBeforeToday, todayKey } from "@/utils/date";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import Section from "@/components/TaskList/Section";
import AddTask from "@/components/TaskList/AddTask";
import CompletedSection from "@/components/TaskList/CompletedSection";

export default function Today() {
	const todos = useTodos();
	const today = todayKey();
	const now = dayjs();

	const overdue = useMemo(
		() => todos.filter((todo) => !todo.completed && todo.dueDate && isBeforeToday(todo.dueDate)),
		[todos]
	);
	const dueToday = useMemo(
		() => todos.filter((todo) => !todo.completed && todo.dueDate === today),
		[todos, today]
	);
	const completedToday = useMemo(
		() => todos.filter((todo) => todo.completed && todo.completedAt && dayjs(todo.completedAt).format("YYYY-MM-DD") === today),
		[todos, today]
	);

	const remaining = overdue.length + dueToday.length;
	const subtitle = `${now.format("M月D日")} · ${WEEKDAYS[now.day()]}${remaining > 0 ? ` · 还有 ${remaining} 个任务` : ""}`;

	return (
		<>
			<PageHeader title="今天" subtitle={subtitle} />

			{overdue.length > 0 && (
				<Section title="逾期" count={overdue.length} todos={overdue} />
			)}

			<Section title={overdue.length > 0 ? "今天" : undefined} todos={dueToday}>
				{remaining === 0 && (
					<EmptyState
						icon={<CoffeeOutlined />}
						title="今天的事都做完了"
						hint="休息一下，或者从收件箱挑一件提前做。"
					/>
				)}
				<AddTask defaults={{ dueDate: today }} />
			</Section>

			<CompletedSection todos={completedToday} />
		</>
	);
}
