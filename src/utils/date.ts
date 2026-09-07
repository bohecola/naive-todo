import dayjs, { type Dayjs } from "dayjs";

export const DATE_FORMAT = "YYYY-MM-DD";

export const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export function todayKey(): string {
	return dayjs().format(DATE_FORMAT);
}

export function addDays(days: number, from: Dayjs = dayjs()): string {
	return from.add(days, "day").format(DATE_FORMAT);
}

export type DueTone = "overdue" | "today" | "tomorrow" | "week" | "later";

export interface DueInfo {
	label: string;
	tone: DueTone;
	/** 与今天相差的天数，负数表示逾期 */
	diff: number;
}

function shortDate(date: Dayjs, now: Dayjs): string {
	return date.year() === now.year() ? date.format("M月D日") : date.format("YYYY年M月D日");
}

// 把截止日期转成人类可读的短标签，并标注色调
export function describeDue(dueDate: string, now: Dayjs = dayjs()): DueInfo {
	const date = dayjs(dueDate);
	const diff = date.startOf("day").diff(now.startOf("day"), "day");

	if (diff < 0) {
		return { label: diff === -1 ? "昨天" : shortDate(date, now), tone: "overdue", diff };
	}
	if (diff === 0) return { label: "今天", tone: "today", diff };
	if (diff === 1) return { label: "明天", tone: "tomorrow", diff };
	if (diff < 7) return { label: WEEKDAYS[date.day()], tone: "week", diff };
	return { label: shortDate(date, now), tone: "later", diff };
}

// 分组标题：9月8日 · 明天 · 周二
export function formatDayHeading(dateKey: string, now: Dayjs = dayjs()): string {
	const date = dayjs(dateKey);
	const parts = [shortDate(date, now)];
	const { diff } = describeDue(dateKey, now);
	if (diff === 0) parts.push("今天");
	if (diff === 1) parts.push("明天");
	parts.push(WEEKDAYS[date.day()]);
	return parts.join(" · ");
}

export function isBeforeToday(dateKey: string, now: Dayjs = dayjs()): boolean {
	return dayjs(dateKey)
		.startOf("day")
		.isBefore(now.startOf("day"));
}
