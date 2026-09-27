import type { Todo } from '@/types'
import { useTodoListDispatch } from '../../context'
import { ActionType } from '../../context/reducer'

interface Props {
	todo: Todo
}

export default function DeleteBtn({ todo }: Props) {
	// 派发器
	const dispatch = useTodoListDispatch()

	return (
		<Button
			icon={<DeleteOutlined />}
			shape="circle"
			size="small"
			onClick={() => { dispatch({ type: ActionType.DELETE_TODO, payload: todo }) }}
		/>
	)
}
