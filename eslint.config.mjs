import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsonc from "eslint-plugin-jsonc";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// unplugin-auto-import 生成的 globals（eslintrc 格式 -> flat config）
const autoImportGlobals = JSON.parse(
	readFileSync(new URL("./.eslintrc-auto-import.json", import.meta.url), "utf8")
).globals;
const autoImportFlatGlobals = Object.fromEntries(
	Object.entries(autoImportGlobals).map(([key, value]) => [key, value ? "writable" : "readonly"])
);

// 复用 @bohecola/eslint-config-basic 的规则与 ignorePatterns
const bohecolaBasic = require("@bohecola/eslint-config-basic");

export default [
	{
		ignores: bohecolaBasic.ignorePatterns
	},
	js.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				JSX: "readonly",
				React: "readonly",
				...autoImportFlatGlobals
			}
		},
		plugins: {
			react,
			"@typescript-eslint": ts
		},
		rules: {
			...react.configs.flat.recommended.rules,
			...react.configs.flat["jsx-runtime"].rules,
			...ts.configs.recommended.rules,
			...bohecolaBasic.rules,
			"no-unused-vars": "off",
			"react/react-in-jsx-scope": "off",
			"react/jsx-no-undef": "off",
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off"
		},
		settings: {
			react: { version: "19.2.8" }
		}
	},
	{
		files: ["*.json", "*.json5"],
		plugins: { jsonc },
		rules: {
			...jsonc.configs["flat/recommended-with-jsonc"].rules
		}
	}
];
