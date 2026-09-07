import type { Priority, Todo } from "@/types";
import { createSampleTodos } from "@/data";

export const STORAGE_KEY = "ntodo";
/** v0.1 时代的存储键，读到后自动迁移 */
export const LEGACY_KEY = "todoList";
export const SCHEMA_VERSION = 2;

interface Persisted {
	version: number;
	todos: Todo[];
}

/** 旧版本数据结构：类型是多选标签，日期是字符串时间戳 */
export interface LegacyTodo {
	id: string;
	content: string;
	date: string;
	type: string[];
	completed: boolean;
}

// 旧的「重要 / 紧急」标签映射到四级优先级
export function migrateLegacy(list: LegacyTodo[]): Todo[] {
	return list.map((item) => {
		const important = item.type?.includes("important");
		const urgent = item.type?.includes("urgent");
		const priority: Priority = important && urgent ? 1 : important ? 2 : urgent ? 3 : 4;
		const createdAt = Number(item.date) || Date.now();

		const todo: Todo = {
			id: item.id,
			content: item.content,
			priority,
			completed: Boolean(item.completed),
			createdAt
		};
		if (todo.completed) todo.completedAt = createdAt;
		return todo;
	});
}

export function loadTodos(storage: Storage = localStorage): Todo[] {
	try {
		const raw = storage.getItem(STORAGE_KEY);
		if (raw) {
			const persisted = JSON.parse(raw) as Persisted;
			if (Array.isArray(persisted.todos)) return persisted.todos;
		}

		const legacy = storage.getItem(LEGACY_KEY);
		if (legacy) {
			const list = JSON.parse(legacy);
			if (Array.isArray(list)) return migrateLegacy(list);
		}
	} catch {
		// 损坏的数据当作没有数据处理
	}

	return createSampleTodos();
}

export function saveTodos(todos: Todo[], storage: Storage = localStorage): void {
	const persisted: Persisted = { version: SCHEMA_VERSION, todos };
	storage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}
