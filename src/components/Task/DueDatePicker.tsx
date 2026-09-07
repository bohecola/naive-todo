import dayjs from "dayjs";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { DATE_FORMAT, describeDue } from "@/utils/date";

interface Props {
	value?: string;
	onChange: (value?: string) => void;
}

export default function DueDatePicker({ value, onChange }: Props) {
	const now = dayjs();

	return (
		<DatePicker
			size="small"
			className="editor-chip editor-date"
			placeholder="日期"
			suffixIcon={<CalendarOutlined />}
			value={value ? dayjs(value) : null}
			format={(date) => describeDue(date.format(DATE_FORMAT)).label}
			presets={[
				{ label: "今天", value: now },
				{ label: "明天", value: now.add(1, "day") },
				{ label: "下周", value: now.add(7, "day") }
			]}
			onChange={(date) => onChange(date ? date.format(DATE_FORMAT) : undefined)}
		/>
	);
}
