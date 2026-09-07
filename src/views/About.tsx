import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import PageHeader from "@/components/common/PageHeader";

const fetcher = async (url: string) => (await fetch(url)).text();

export default function About() {
	const { data } = useSWR("/static/md/README.md", fetcher, { suspense: true });

	return (
		<>
			<PageHeader title="关于" />
			<article className="markdown">
				<ReactMarkdown>{data}</ReactMarkdown>
			</article>
		</>
	);
}
