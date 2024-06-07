import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function BaseContainer({ className, children }: Props) {
	return (
		<div className={`
      max-w-3xl mx-auto
      p-7 bg-slate-800 text-white border-2 border-slate-600
      ${className ?? ""}
    `}>
			{children}
		</div>
	);
}
