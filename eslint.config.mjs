import { readFileSync } from 'node:fs'
import antfu from '@antfu/eslint-config'

// unplugin-auto-import 生成的 globals（eslintrc 格式 -> flat config）
const autoImportGlobals = JSON.parse(
	readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8'),
).globals
const autoImportFlatGlobals = Object.fromEntries(
	Object.entries(autoImportGlobals).map(([key, value]) => [key, value ? 'writable' : 'readonly']),
)

export default antfu({
	type: 'app',
	react: true,
	// 缩进沿用仓库现有的 tab；引号与分号采用 antfu 默认风格（单引号 / 无分号）
	stylistic: {
		indent: 'tab',
	},
}, {
	files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}'],
	languageOptions: {
		globals: autoImportFlatGlobals,
	},
}, {
	rules: {
		// 项目约定：放宽以下规则
		'ts/no-non-null-assertion': 'off',
		'ts/no-explicit-any': 'off',
		// JSON 文件保持 2 空格缩进惯例，不随代码的 tab 缩进
		'jsonc/indent': ['error', 2],
	},
})
