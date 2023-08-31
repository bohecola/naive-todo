const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	webpack: {
		alias: { "@": path.resolve(__dirname, "src") },
		plugins: [
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "./CHANGELOG.md"),
						to: path.resolve(__dirname, "./build/static/md/CHANGELOG.md")
					},
					{
						from: path.resolve(__dirname, "./README.md"),
						to: path.resolve(__dirname, "./build/static/md/README.md")
					}
				]
			}),
			new CompressionPlugin({
				filename: "[path][base].gz",
				algorithm: "gzip",
				test: /\.js$|\.css$/,
				threshold: 10240,
				minRatio: 0.8
			})
		]
	}
};
