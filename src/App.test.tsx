import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
	it("renders the sidebar and inbox view", () => {
		render(
			<HashRouter>
				<App />
			</HashRouter>
		);
		expect(screen.getByText("NTodo")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1, name: "收件箱" })).toBeInTheDocument();
	});
});
