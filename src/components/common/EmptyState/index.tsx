import type { ReactNode } from "react";

interface Props {
	icon: ReactNode;
	title: string;
	hint: string;
}

export default function EmptyState({ icon, title, hint }: Props) {
	return (
		<div className="empty-state">
			<div className="empty-icon">{icon}</div>
			<p className="m-0 text-[15px] font-semibold text-ink">{title}</p>
			<p className="mt-1 mb-0 text-[13px] text-ink-2">{hint}</p>
		</div>
	);
}
