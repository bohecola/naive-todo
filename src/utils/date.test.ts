import { describe, expect, it } from "vitest";
import dayjs from "dayjs";
import { describeDue, formatDayHeading } from "./date";

const now = dayjs("2026-09-07"); // 周一

describe("describeDue", () => {
	it("labels relative days", () => {
		expect(describeDue("2026-09-06", now)).toMatchObject({ label: "昨天", tone: "overdue" });
		expect(describeDue("2026-09-01", now)).toMatchObject({ label: "9月1日", tone: "overdue" });
		expect(describeDue("2026-09-07", now)).toMatchObject({ label: "今天", tone: "today" });
		expect(describeDue("2026-09-08", now)).toMatchObject({ label: "明天", tone: "tomorrow" });
		expect(describeDue("2026-09-10", now)).toMatchObject({ label: "周四", tone: "week" });
		expect(describeDue("2026-09-20", now)).toMatchObject({ label: "9月20日", tone: "later" });
		expect(describeDue("2027-01-02", now)).toMatchObject({ label: "2027年1月2日", tone: "later" });
	});

	it("builds day headings", () => {
		expect(formatDayHeading("2026-09-08", now)).toBe("9月8日 · 明天 · 周二");
		expect(formatDayHeading("2026-09-12", now)).toBe("9月12日 · 周六");
	});
});
