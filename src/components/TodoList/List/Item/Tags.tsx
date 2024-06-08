import { Tag } from "antd";
import { Todo } from "@/types";
import { options } from "@/data";

type Props = {
  todo: Todo;
}

export default function Tags({ todo }: Props) {
	return <div className="mr-4">
		{todo.type.map((e) => {
			return (
				<Tag
					className="mr-1 last:mr-0 bg-slate-700 text-gray-200"
					bordered={false}
					key={e}>{
						options?.find((item) => item.value === e)?.label
					}
				</Tag>
			);
		})}
	</div>;
}
