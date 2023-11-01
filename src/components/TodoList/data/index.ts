import type { SelectProps } from "antd";
// 选项
export const options: SelectProps["options"] = [
	{ label: "重要", value: "important" },
	{ label: "不重要", value: "not important" },
	{ label: "紧急", value: "urgent" },
	{ label: "不紧急", value: "not urgent" }
];
