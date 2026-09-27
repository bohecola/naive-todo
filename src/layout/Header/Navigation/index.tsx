import type { NavItem } from '@/types'
import Item from './Item'

interface Props {
	navs: NavItem[]
}

export default function Navigaiton({ navs }: Props) {
	return (
		<div className="flex items-center">
			{navs.map(e => (
				<Item key={e.type === 'text' ? e.path : e.link} {...e} />
			))}
		</div>
	)
}
