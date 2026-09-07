import type { Priority, Todo } from "@/types";
import { addDays, todayKey } from "@/utils/date";

export interface PriorityMeta {
	value: Priority;
	label: string;
	/** 旗帜、圆圈边框颜色 */
	color: string;
	/** 圆圈底色（P4 无底色） */
	tint: string;
}

// 优先级配置，颜色沿用 Todoist 的四级约定：红 / 橙 / 蓝 / 灰
export const PRIORITIES: PriorityMeta[] = [
	{ value: 1, label: "优先级 1", color: "#d1453b", tint: "rgba(209, 69, 59, 0.10)" },
	{ value: 2, label: "优先级 2", color: "#eb8909", tint: "rgba(235, 137, 9, 0.10)" },
	{ value: 3, label: "优先级 3", color: "#246fe0", tint: "rgba(36, 111, 224, 0.10)" },
	{ value: 4, label: "优先级 4", color: "#808080", tint: "transparent" }
];

export const DEFAULT_PRIORITY: Priority = 4;

export function priorityMeta(priority: Priority): PriorityMeta {
	return PRIORITIES.find((item) => item.value === priority) ?? PRIORITIES[3];
}

// 首次打开时的示例数据，日期相对于打开当天生成
export function createSampleTodos(now = Date.now()): Todo[] {
	return [
		{
			id: "sample-welcome",
			content: "点开这条任务，看看能编辑什么",
			note: "标题、备注、日期和优先级都能改。按 Esc 取消，按 Enter 保存。",
			priority: 1,
			dueDate: todayKey(),
			completed: false,
			createdAt: now
		},
		{
			id: "sample-today",
			content: "回复积压的邮件",
			priority: 3,
			dueDate: todayKey(),
			completed: false,
			createdAt: now - 1
		},
		{
			id: "sample-tomorrow",
			content: "去超市买牛奶和鸡蛋",
			priority: 4,
			dueDate: addDays(1),
			completed: false,
			createdAt: now - 2
		},
		{
			id: "sample-later",
			content: "预约牙医复查",
			priority: 2,
			dueDate: addDays(4),
			completed: false,
			createdAt: now - 3
		},
		{
			id: "sample-someday",
			content: "整理相册里的旧照片",
			priority: 4,
			completed: false,
			createdAt: now - 4
		},
		{
			id: "sample-done",
			content: "安装 NTodo",
			priority: 4,
			completed: true,
			createdAt: now - 5,
			completedAt: now - 5
		}
	];
}
