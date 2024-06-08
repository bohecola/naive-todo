import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTodoListDispatch } from "../../context";
import { ActionType } from "../../context/reducer";
import { Todo } from "@/types";

type Props = {
  todo: Todo
}

export default function DeleteBtn({ todo }: Props) {
	// 派发器
	const dispatch = useTodoListDispatch();

	return (
		<Button
			icon={ <DeleteOutlined /> }
			shape="circle"
			size="small"
			onClick={() => { dispatch({ type: ActionType.DELETE_TODO, payload: todo }); }}
		/>
	);
}
