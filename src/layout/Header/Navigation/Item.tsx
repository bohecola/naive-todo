import type { IconNavItem, NavItem, TextNavItem } from '@/types'

// 图标
const icons: { [key: string]: any } = { github: GithubOutlined }

// 文本导航
function TextNav(props: TextNavItem) {
	// 导航
	const navigate = useNavigate()

	// 路由
	const location = useLocation()

	// 活跃
	const active = location.pathname === props.path

	return (
		<span
			className={`
          ml-1.5 p-2 cursor-pointer rounded hover:bg-gray-200/20 hover:text-white
          ${active ? 'bg-gray-200/20 text-white' : ''}
        `}
			onClick={() => { navigate(props.path) }}
		>
			{props.title}
		</span>
	)
}

// 图标导航
function IconNav({ icon, link }: IconNavItem) {
	const Icon = icons[icon]
	return (
		<Icon
			className="ml-2 text-lg hover:text-white"
			onClick={() => { window.open(link) }}
		/>
	)
}

// Fallback
function Fallback() {
	return <span>Navigation Item Type Error</span>
}

export default function Item(props: NavItem) {
	switch (props.type) {
		case 'text':
			return <TextNav {...props} />
		case 'icon':
			return <IconNav {...props} />
		default:
			return <Fallback />
	}
}
