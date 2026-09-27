import BaseContainer from '../common/Container'
import { useTodoList } from './context'
import TodoInput from './Input'
import List from './List'

export default function TodoList() {
	const { todoList } = useTodoList()

	// 未完成列表
	const unDoneList = useMemo(() => todoList.filter(item => !item.completed), [todoList])

	// 已完成列表
	const doneList = useMemo(() => todoList.filter(item => item.completed), [todoList])

	return (
		<BaseContainer>
			<List
				title="任务列表"
				list={unDoneList}
				draggable
			/>

			{doneList.length > 0 && (
				<List
					title="已完成"
					list={doneList}
				/>
			)}
			<TodoInput />
		</BaseContainer>
	)
}
