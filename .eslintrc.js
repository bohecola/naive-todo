module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"@bohecola"
	],
	overrides: [
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: [
		"react",
		"@typescript-eslint"
	],
	globals: {
		JSX: true,
		React: true
	},
	rules: {
		"no-unused-vars": "off",
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": "off"
	}
};
