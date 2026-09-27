import type { ChangeEvent } from 'react'
import type { Todo } from '@/types'
import { options } from '@/data'
import { useTodoList, useTodoListDispatch } from '../../context'
import { ActionType } from '../../context/reducer'
import { formatDate } from '../../utils'

interface Props {
	todo: Todo
}

export default function Content({ todo }: Props) {
	// 输入框数据
	const [inputValue, setInputValue] = useState(todo.content)

	// 活跃状态
	const { activeId } = useTodoList()

	// 派发器
	const dispatch = useTodoListDispatch()

	// 进入编辑态：用最新内容初始化输入框（已在编辑态时不重置，避免覆盖正在输入的内容）
	const setActive = () => {
		if (activeId === todo.id)
			return
		setInputValue(todo.content)
		dispatch({ type: ActionType.UPDATE_ACTIVE_ID, payload: todo.id })
	}

	// 输入监听
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	// 类型选择
	const handleSelectChange = (val: string[]) => {
		dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, type: val } })
	}

	// 离开编辑态：提交内容并清除活跃状态
	const clearActive = () => {
		if (!todo.completed && inputValue !== todo.content) {
			dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, content: inputValue } })
		}
		dispatch({ type: ActionType.UPDATE_ACTIVE_ID, payload: '' })
	}

	return (
		<div
			className={`mr-auto px-3 text-sm break-all ${todo.completed ? 'text-gray-400 line-through' : 'text-white'}`}
			onClick={setActive}
		>
			{activeId === todo.id
				?	(
						<Space.Compact onBlur={clearActive} className="flex w-115">
							<Input
								className="mr-1 w-75"
								autoFocus={true}
								maxLength={200}
								value={inputValue}
								onChange={handleInputChange}
								onPressEnter={clearActive}
							/>
							<Select
								mode="multiple"
								className="w-40"
								value={todo.type}
								options={options}
								maxTagCount={1}
								placeholder="任务类型"
								onChange={handleSelectChange}
								disabled={todo.completed}
							/>
						</Space.Compact>
					)
				:	(
						<span className="cursor-text">
							{todo.content}
							<span className="block text-xs text-gray-500 mt-0.5">{formatDate(todo.date)}</span>
						</span>
					)}
		</div>
	)
}
