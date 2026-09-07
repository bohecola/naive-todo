import type { ReactNode } from "react";

interface Props {
	title: string;
	subtitle?: ReactNode;
}

export default function PageHeader({ title, subtitle }: Props) {
	return (
		<header className="mb-6">
			<h1 className="m-0 text-[26px] font-bold leading-tight tracking-tight text-ink">{title}</h1>
			{subtitle && <p className="mt-1 mb-0 text-[13px] text-ink-2">{subtitle}</p>}
		</header>
	);
}
