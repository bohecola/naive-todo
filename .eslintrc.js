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
	globals: { JSX: true },
	rules: {
		"no-unused-vars": "off",
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-var-requires": "off"
	}
};
