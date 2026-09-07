import { beforeEach, describe, expect, it } from "vitest";
import { LEGACY_KEY, STORAGE_KEY, loadTodos, migrateLegacy, saveTodos } from "./storage";

describe("storage", () => {
	beforeEach(() => localStorage.clear());

	it("maps legacy tags to the four priority levels", () => {
		const todos = migrateLegacy([
			{ id: "1", content: "both", date: "1701070670571", type: ["important", "urgent"], completed: true },
			{ id: "2", content: "important", date: "1701070670571", type: ["important"], completed: false },
			{ id: "3", content: "urgent", date: "1701070670571", type: ["urgent"], completed: false },
			{ id: "4", content: "none", date: "bad", type: ["not important"], completed: false }
		]);
		expect(todos.map((t) => t.priority)).toEqual([1, 2, 3, 4]);
		expect(todos[0].completedAt).toBe(1701070670571);
		expect(todos[1].completedAt).toBeUndefined();
		expect(todos[3].createdAt).toBeTypeOf("number");
	});

	it("reads the legacy key when the new key is absent", () => {
		localStorage.setItem(LEGACY_KEY, JSON.stringify([
			{ id: "1", content: "old", date: "1", type: ["urgent"], completed: false }
		]));
		const todos = loadTodos();
		expect(todos).toHaveLength(1);
		expect(todos[0]).toMatchObject({ id: "1", content: "old", priority: 3 });
	});

	it("prefers the versioned store and round-trips", () => {
		localStorage.setItem(LEGACY_KEY, "[]");
		saveTodos([{ id: "x", content: "x", priority: 2, completed: false, createdAt: 5 }]);
		expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).version).toBe(2);
		expect(loadTodos()[0].id).toBe("x");
	});

	it("falls back to sample data on corrupt input", () => {
		localStorage.setItem(STORAGE_KEY, "{not json");
		expect(loadTodos().length).toBeGreaterThan(0);
	});
});
