const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	webpack: {
		alias: { "@": path.resolve(__dirname, "src"), },
		plugins: [
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "./CHANGELOG.md"),
						to: path.resolve(__dirname, "./build/static/md/CHANGELOG.md")
					}
				]
			})
		]
	}
};
