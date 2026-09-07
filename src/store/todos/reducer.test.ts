import { describe, expect, it } from "vitest";
import type { Todo } from "@/types";
import { todosReducer } from "./reducer";

const make = (id: string, extra: Partial<Todo> = {}): Todo => ({
	id,
	content: id,
	priority: 4,
	completed: false,
	createdAt: 1,
	...extra
});

describe("todosReducer", () => {
	it("appends on add and inserts at index when given", () => {
		const list = [make("a"), make("b")];
		expect(todosReducer(list, { type: "add", todo: make("c") }).map((t) => t.id)).toEqual(["a", "b", "c"]);
		expect(todosReducer(list, { type: "add", todo: make("c"), index: 1 }).map((t) => t.id)).toEqual(["a", "c", "b"]);
	});

	it("records completedAt on toggle and clears it on undo", () => {
		const [done] = todosReducer([make("a")], { type: "toggle", id: "a", completed: true });
		expect(done.completed).toBe(true);
		expect(done.completedAt).toBeTypeOf("number");

		const [undone] = todosReducer([done], { type: "toggle", id: "a", completed: false });
		expect(undone.completed).toBe(false);
		expect(undone.completedAt).toBeUndefined();
	});

	it("moves the dragged item before the target on reorder", () => {
		const list = [make("a"), make("b"), make("c")];
		expect(todosReducer(list, { type: "reorder", fromId: "c", toId: "a" }).map((t) => t.id)).toEqual(["c", "a", "b"]);
		expect(todosReducer(list, { type: "reorder", fromId: "a", toId: "c" }).map((t) => t.id)).toEqual(["b", "c", "a"]);
		expect(todosReducer(list, { type: "reorder", fromId: "a", toId: "missing" })).toBe(list);
	});

	it("clears completed only", () => {
		const list = [make("a", { completed: true }), make("b")];
		expect(todosReducer(list, { type: "clearCompleted" }).map((t) => t.id)).toEqual(["b"]);
	});
});
