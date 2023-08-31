import { NavItem } from "@/types";
import Item from "./Item";

interface Props {
  navs: NavItem[]
}

export default function Navigaiton({ navs }: Props) {
	return (
		<div className="flex items-center">
			{navs.map((e, i) => {
				return <Item key={i} {...e} />;
			})}
		</div>
	);
}
