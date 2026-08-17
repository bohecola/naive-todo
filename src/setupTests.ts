// jest-dom 的 vitest 入口，注册 expect 匹配器（toBeInTheDocument 等）
import "@testing-library/jest-dom/vitest";

// antd 组件在 jsdom 环境下需要 matchMedia
if (!window.matchMedia) {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false
		})
	});
}
