import React from "react";
import Layout from "@/layout";
import TopBar from "@/components/common/TopBar";

function App() {
	return (
		<div className="App">
			<Layout
				header={() => <TopBar />}
			/>
		</div>
	);
}

export default App;
