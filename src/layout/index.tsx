import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import routes from "@/router";
import Sidebar from "@/components/Sidebar";
import { QuickAddProvider } from "@/components/QuickAdd";

export default function Layout() {
	const outlet = useRoutes(routes);
	const location = useLocation();
	const [drawerOpen, setDrawerOpen] = useState(false);

	// 手机端切换路由后收起抽屉
	useEffect(() => {
		setDrawerOpen(false);
	}, [location.pathname]);

	return (
		<QuickAddProvider>
			<div className="min-h-screen bg-canvas text-ink md:grid md:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="sticky top-0 hidden h-screen bg-side md:block">
					<Sidebar />
				</aside>

				<Drawer
					placement="left"
					width={260}
					open={drawerOpen}
					closeIcon={null}
					styles={{ body: { padding: 0, background: "#fcfaf8" } }}
					onClose={() => setDrawerOpen(false)}
				>
					<Sidebar />
				</Drawer>

				<div className="min-w-0">
					<div className="flex h-12 items-center px-2 md:hidden">
						<Button
							type="text"
							aria-label="打开菜单"
							icon={<MenuOutlined />}
							onClick={() => setDrawerOpen(true)}
						/>
					</div>
					<main className="mx-auto w-full max-w-[800px] px-5 pb-24 pt-4 md:px-12 md:pt-12">
						{outlet}
					</main>
				</div>
			</div>
		</QuickAddProvider>
	);
}
