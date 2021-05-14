const auth = require("./middleware/auth.js");
module.exports = {
	debug: true,
	baseDir: __dirname,
	middleware: [
		[
			auth(),
			{
				enable: true,
				ignore: /\/login$/
			},
		],
	],
}
