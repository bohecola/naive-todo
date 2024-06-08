import { Suspense } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import BaseContainer from "@/components/common/Container";
import Loading from "@/components/common/Loading";

export default function About() {
	const fetcher = async (url: string) => {
		const response = await fetch(url);
		return response.text();
	};

	const { data } = useSWR("/static/md/README.md", fetcher, { suspense: true });

	return (
		<Suspense fallback={<Loading />}>
			<BaseContainer>
				<ReactMarkdown>{data}</ReactMarkdown>
			</BaseContainer>
		</Suspense>
	);
}
