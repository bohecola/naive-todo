import { Skeleton } from "antd";
import BaseContainer from "../Container";

export default function Loading() {
	return (
		<BaseContainer>
			<Skeleton active/>
		</BaseContainer>
	);
}
