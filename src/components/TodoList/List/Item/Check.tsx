import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Todo } from "@/types";
import { ActionType } from "../../context/reducer";
import { useTodoListDispatch } from "../../context";

type Props = {
  todo: Todo;
}

export default function Check({ todo }:  Props) {
	// 派发器
	const dispatch = useTodoListDispatch();

	// 更新状态
	const onCheckBoxChange = (e: CheckboxChangeEvent) => {
		dispatch({ type: ActionType.UPDATE_TODO, payload: { ...todo, completed: e.target.checked } });
	};

	return <Checkbox
		checked={todo.completed}
		onChange={onCheckBoxChange}
	/>;
}
