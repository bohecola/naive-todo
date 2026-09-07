import type { CSSProperties } from "react";
import { CheckOutlined } from "@ant-design/icons";
import type { Priority } from "@/types";
import { priorityMeta } from "@/data";

interface Props {
	priority: Priority;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

// 圆形勾选框，边框颜色跟随优先级；勾选时先填色再提交，让条目有个短暂的「完成」反馈
export default function TaskCheck({ priority, checked, onChange }: Props) {
	const meta = priorityMeta(priority);
	const [pending, setPending] = useState(false);
	const timer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const handleClick = () => {
		if (checked) {
			onChange(false);
			return;
		}
		setPending(true);
		timer.current = window.setTimeout(() => {
			setPending(false);
			onChange(true);
		}, 220);
	};

	return (
		<button
			type="button"
			role="checkbox"
			aria-checked={checked}
			aria-label={checked ? "标记为未完成" : "标记为已完成"}
			className="task-check"
			data-checked={checked || pending}
			style={{ "--check": meta.color, "--check-bg": meta.tint } as CSSProperties}
			onClick={handleClick}
		>
			<CheckOutlined />
		</button>
	);
}
