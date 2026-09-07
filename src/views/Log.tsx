import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import PageHeader from "@/components/common/PageHeader";

const fetcher = async (url: string) => (await fetch(url)).text();

export default function Log() {
	const { data } = useSWR("/static/md/CHANGELOG.md", fetcher, { suspense: true });

	return (
		<>
			<PageHeader title="更新日志" />
			<article className="markdown">
				<ReactMarkdown>{data}</ReactMarkdown>
			</article>
		</>
	);
}
