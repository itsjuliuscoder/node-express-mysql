	const express = require('express');
	const urlRouter = express.Router();
	const customers = require("../controllers/customer.controller.js");

	// Create a new Customer
	urlRouter.post("/customers", customers.create);

	// Retrieve all Customers
	urlRouter.get("/customers", customers.findAll);

	// Retrieve a single Customer with customerId
	urlRouter.get("/customers/:customerId", customers.findOne);

	// Update a Customer with customerId
	urlRouter.put("/customers/:customerId", customers.update);

	// Delete a Customer with customerId
	urlRouter.delete("/customers/:customerId", customers.delete);

	// Create a new Customer
	urlRouter.delete("/customers", customers.deleteAll);

	module.exports = urlRouter;