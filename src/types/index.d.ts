export type Priority = 1 | 2 | 3 | 4;

export interface Todo {
  id: string;
  content: string;
  /** 备注，可选 */
  note?: string;
  priority: Priority;
  /** 截止日期，格式 YYYY-MM-DD；没有则表示未安排 */
  dueDate?: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

/** 新建 / 编辑任务时用户可填写的字段 */
export type TodoDraft = Pick<Todo, "content" | "note" | "priority" | "dueDate">;
