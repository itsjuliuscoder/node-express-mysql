const Customer = require("../models/customer.model.js");

//create and save a new customer
exports.create = (req, res) => {
	//validate request 
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	//create a customer 
	const customer = new Customer({
		email: req.body.email,
		name: req.body.name,
		active: req.body.active
	});

	//save customer in the database 
	Customer.create(customer, (err, data) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Customer."
	      });
	    else res.send(data);
  	});

};

//retrieve all customers from the database 
exports.findAll = (req, res) => {
	Customer.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occured while retrieving customers."
			});	
		else res.send(data);
		
	});
};

//find a single customer with a customerId 
exports.findOne =  (req, res) => {
	Customer.findById(req.params.customersId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Customer with id ${req.params.customerId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Customer with id " + req.params.customerId
				});
			}
		} else res.send(data);
	});
};

//update a customer identified by the customerId in the request 
exports.update = (req, res) => {
	//validate request 
	if (!res.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	Customer.updateById(
		req.params.customerId,
		new Customer(req.body),
		(err, data) => {
			if (err) {
				if(err.kind === "not_found"){
					res.status(404).send({
						message: `Not found Customer with id ${req.params.customerId}.`
					});
				} else {
					res.status(500).send({
						message: "Error updating Customer with id " + req.params.customerId
					});
				}
			} else res.send(data);
		}
	);
};

//delete a customer with the specified customerId in the request 
exports.delete = (req, res) => {
	Customer.remove(req.params.customerId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found customer with id ${req.params.customerId}.`
				});
			} else {
				res.status(500).send({
					message: "Could not delete Customer with id " + req.params.customerId
				});
			}
		} else res.send({ message: `Customer was deleted successfully` });
	});
};

//delete all customers from the database
exports.deleteAll = (req, res) => {
	Customer.removeAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: 
					err.message || "Some error occured while removing all customers"
			});
		} else res.send({message: `All Customers were deleted successfully`});
	});
};