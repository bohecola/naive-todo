import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import BaseContainer from "@/components/common/Container";

export default function About() {
	const fetcher = async (url: string) => {
		const response = await fetch(url);
		return response.text();
	};

	const { data, error, isLoading } = useSWR("/static/md/CHANGELOG.md", fetcher);

	return (
		<BaseContainer>
			<ReactMarkdown>{data ?? ""}</ReactMarkdown>
		</BaseContainer>
	);
}
