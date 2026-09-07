# NTodo

使用 React + TS 实现的一个 TodoList，交互和视觉参考了 Todoist

## 技术栈

- React 19 + TypeScript
- Vite + Ant Design 5 + Tailwind CSS
- SWR + react-markdown

## 功能

- [x] 收件箱 / 今天 / 即将到来三个视图
- [x] 任务添加、编辑、删除（可撤销）
- [x] 备注、截止日期、四级优先级
- [x] 拖拽排序（收件箱）
- [x] 已完成折叠与清空
- [x] 快捷键 `Q` 快速添加，编辑时 `Enter` 保存、`Esc` 取消
- [x] 手机端适配

## 数据存储

浏览器 LocalStorage（带版本号，旧版本数据自动迁移）

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:5173）
pnpm dev

# 类型检查 + 构建生产版本
pnpm build

# 运行测试
pnpm test
```

## 预览

[在线体验](https://todo.deore.me)
