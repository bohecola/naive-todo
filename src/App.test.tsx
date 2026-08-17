import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
	it("renders the NTodo title", () => {
		render(
			<HashRouter>
				<App />
			</HashRouter>
		);
		expect(screen.getByText("NTodo")).toBeInTheDocument();
	});
});
