import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import BaseContainer from "@/components/common/Container";

export default function About() {
	const [content, setContent] = useState<string>("");

	useEffect(() => {
		fetch("/static/md/CHANGELOG.md")
			.then((res) => res.text())
			.then((text) => setContent(text));
	}, []);

	return (
		<BaseContainer>
			<ReactMarkdown>{content}</ReactMarkdown>
		</BaseContainer>
	);
}
