import { defineConfig, type Plugin } from "vitest/config";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// 把根目录的 README.md / CHANGELOG.md 暴露为 /static/md/*.md
// （兼容原 CRA 里 CopyPlugin 的行为，供 About / Changelog 页面 fetch）
function rootMdFilesPlugin(): Plugin {
	const root = process.cwd();
	const files = ["README.md", "CHANGELOG.md"];

	return {
		name: "serve-root-md-files",
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const match = (req.url ?? "").match(/^\/static\/md\/([^/?]+\.md)/);
				if (match && files.includes(match[1])) {
					const filePath = resolve(root, match[1]);
					if (existsSync(filePath)) {
						res.setHeader("Content-Type", "text/markdown; charset=utf-8");
						res.end(readFileSync(filePath, "utf-8"));
						return;
					}
				}
				next();
			});
		},
		closeBundle() {
			const outDir = resolve(root, "dist", "static", "md");
			mkdirSync(outDir, { recursive: true });
			for (const file of files) {
				const src = resolve(root, file);
				if (existsSync(src)) {
					copyFileSync(src, resolve(outDir, file));
				}
			}
		}
	};
}

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		AutoImport({
			imports: [
				"react",
				{
					react: ["createContext", "lazy", "Suspense", "StrictMode"],
					"react-router-dom": [
						"HashRouter",
						"Navigate",
						"useRoutes",
						"useLocation",
						"useNavigate"
					],
					antd: [
						"ConfigProvider",
						"theme",
						"Tag",
						"Checkbox",
						"Button",
						"Skeleton",
						"Input",
						"Select",
						"Space"
					],
					"@ant-design/icons": [
						"GithubOutlined",
						"DeleteOutlined",
						"InboxOutlined",
						"SendOutlined"
					]
				}
			],
			dts: "src/auto-imports.d.ts",
			eslintrc: {
				enabled: true,
				filepath: "./.eslintrc-auto-import.json"
			}
		}),
		rootMdFilesPlugin()
	],
	resolve: {
		alias: {
			"@": resolve(process.cwd(), "src")
		}
	},
	test: {
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts"
	}
});
