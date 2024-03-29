import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function About() {
	const [content, setContent] = useState<string>("");

	useEffect(() => {
		fetch("/static/md/CHANGELOG.md")
			.then((res) => res.text())
			.then((text) => setContent(text));
	}, []);

	return (
		<div className="max-w-3xl mx-auto">
			<ReactMarkdown className="p-5 bg-slate-800 text-white border-2 border-slate-600">{content}</ReactMarkdown>
		</div>
	);
}
