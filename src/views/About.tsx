// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { use } from "react";
import ReactMarkdown from "react-markdown";
import BaseContainer from "@/components/common/Container";

export default function About() {
	const fetchData = async () => {
		const response = await fetch("/static/md/README.md");
		return response.text();
	};

	const data = use(fetchData());

	return (
		<BaseContainer>
			<ReactMarkdown>{data}</ReactMarkdown>
		</BaseContainer>
	);
}
