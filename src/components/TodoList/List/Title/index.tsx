import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
	return (
		<div className="text-white/90 font-bold mb-3">{children}</div>
	);
}
