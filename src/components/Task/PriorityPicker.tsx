import { Button, Dropdown } from "antd";
import { FlagFilled, FlagOutlined } from "@ant-design/icons";
import type { Priority } from "@/types";
import { PRIORITIES, priorityMeta } from "@/data";

interface Props {
	value: Priority;
	onChange: (value: Priority) => void;
}

export default function PriorityPicker({ value, onChange }: Props) {
	const meta = priorityMeta(value);
	const isDefault = value === 4;

	return (
		<Dropdown
			trigger={["click"]}
			menu={{
				selectedKeys: [String(value)],
				items: PRIORITIES.map((item) => ({
					key: String(item.value),
					label: item.label,
					icon: <FlagFilled style={{ color: item.color }} />
				})),
				onClick: ({ key }) => onChange(Number(key) as Priority)
			}}
		>
			<Button
				size="small"
				className="editor-chip"
				icon={isDefault ? <FlagOutlined /> : <FlagFilled style={{ color: meta.color }} />}
			>
				{isDefault ? "优先级" : `P${value}`}
			</Button>
		</Dropdown>
	);
}
