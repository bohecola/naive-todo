import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'
import BaseContainer from '@/components/common/Container'
import Loading from '@/components/common/Loading'

export default function Log() {
	const fetcher = async (url: string) => {
		const response = await fetch(url)
		return response.text()
	}

	const { data } = useSWR('/static/md/CHANGELOG.md', fetcher, { suspense: true })

	return (
		<Suspense fallback={<Loading />}>
			<BaseContainer className="max-h-[calc(100vh-120px)] overflow-y-auto">
				<ReactMarkdown>{data}</ReactMarkdown>
			</BaseContainer>
		</Suspense>
	)
}
