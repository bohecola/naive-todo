import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
	return (
		<div className="text-gray-500 font-bold mb-3">{children}</div>
	);
}
