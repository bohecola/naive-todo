module.exports = {
	types: [
		{
			value: 'WIP',
			name: '💡  WIP: Work in progress',
		},
		{
			value: 'feat',
			name: '🚀  feat: A new feature',
		},
		{
			value: 'fix',
			name: '🔧  fix: A bug fix',
		},
		{
			value: 'refactor',
			name: '🔨  refactor: A code change that neither fixes a bug nor adds a feature',
		},
		{
			value: 'release',
			name: '🛳  release: Bump to a new Semantic version',
		},
		{
			value: 'docs',
			name: '📚  docs: Documentation only changes',
		},
		{
			value: 'test',
			name: '🔍  test: Add missing tests or correcting existing tests',
		},
		{
			value: 'perf',
			name: '⚡️  perf: Changes that improve performance',
		},
		{
			value: 'chore',
			name:
        '🚬  chore: Changes that don\'t modify src or test files. Such as updating build tasks, package manager',
		},
		{
			value: 'workflow',
			name:
        '📦  workflow: Changes that only affect the workflow. Such as updating build systems or CI etc.',
		},
		{
			value: 'style',
			name:
        '💅  style: Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
		},
		{
			value: 'build',
			name: '🍺  build: Changes to project construction or dependencies',
		},
		{
			value: 'revert',
			name: '⏱  revert: Revert to a commit',
		},
	],
	// Specify the scopes for your particular project
	scopes: [
		['components', '组件相关'],
		['hooks', 'hook 相关'],
		['utils', 'utils 相关'],
		['styles', '样式相关'],
		['deps', '项目依赖'],
		['build', '构建相关'],
		['other', '其他修改'],
	].map(([value, description]) => {
		return {
			value,
			name: `${value.padEnd(30)} (${description})`,
		}
	}),
	scopeOverrides: {},
	allowCustomScopes: true,
	allowBreakingChanges: ['feat', 'fix'],
}
