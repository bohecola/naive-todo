import { Todo } from "@/types";
import type { SelectProps } from "antd";

// 优先级选项
export const options: SelectProps["options"] = [
	{ label: "重要", value: "important" },
	{ label: "不重要", value: "not important" },
	{ label: "紧急", value: "urgent" },
	{ label: "不紧急", value: "not urgent" }
];

// 初始化数据
export const initialTodoList: Todo[] = [
	{
		id: "aLkNOpoJ-NH6YjU1ZC0-Z",
		content: "Wake up",
		date: "1701070670571",
		type: [
			"important"
		],
		completed: true
	},
	{
		id: "024Jg9umg-TEKkpaKRw5O",
		content: "Brush teeth",
		date: "1701070660717",
		type: [
			"important",
			"urgent"
		],
		completed: true
	},
	{
		id: "Mu1hSWJM56BpLsGxV2Bt1",
		content: "Eat Breakfast",
		date: "1701070409475",
		type: [
			"important"
		],
		completed: false
	},
	{
		id: "gait7GnICl98pSUx71tf0",
		content: "Jumping rope for 5 minutes",
		date: "1701070405605",
		type: [
			"not important"
		],
		completed: false
	},
	{
		id: "EA9Z-kPDiY3KFW7SRI7tK",
		content: "Have Lunch",
		date: "1701070400993",
		type: [
			"not urgent"
		],
		completed: false
	}
];
