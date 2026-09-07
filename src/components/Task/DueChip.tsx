import { CalendarOutlined } from "@ant-design/icons";
import { describeDue } from "@/utils/date";

interface Props {
	dueDate: string;
	muted?: boolean;
}

export default function DueChip({ dueDate, muted }: Props) {
	const { label, tone } = describeDue(dueDate);
	return (
		<span className="due-chip" data-tone={muted ? "later" : tone}>
			<CalendarOutlined />
			{label}
		</span>
	);
}
