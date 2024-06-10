const Controller = require("../controllers/controller");

const routes = [
	{
		method: "GET",
		path: "/books",
		handler: Controller.getAllBook,
	},
	{
		method: "POST",
		path: "/books",
		handler: Controller.addBook,
	},
];

module.exports = routes;
