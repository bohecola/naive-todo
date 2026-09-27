import type { ReactElement } from 'react'
// 路由配置文件，lazy 组件与路由表需要在同一文件导出
/* eslint-disable react-refresh/only-export-components */
import Loading from '@/components/common/Loading'
import Home from '@/views/Home'

const About = lazy(() => import('@/views/About'))
const Log = lazy(() => import('@/views/Log'))

function withLoadingComponent(comp: ReactElement) {
	return (
		<Suspense fallback={<Loading />}>
			{comp}
		</Suspense>
	)
}

const routes = [
	{
		path: '/',
		element: <Navigate to="/home" />,
	},
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '/about',
		element: withLoadingComponent(<About />),
	},
	{
		path: '/changelog',
		element: withLoadingComponent(<Log />),
	},
]

export default routes
