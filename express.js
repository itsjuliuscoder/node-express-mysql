const express = require('express');
const bodyParser = require('body-parser');
const urlRouter = require("./app/routes/customer.routes.js");

const MainRouter = express.Router();

const app =  express();

//parse requests of content-type: application/json 
app.use(bodyParser.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to My JSON application" });
});

app.use('/api', urlRouter);

// set port, listen for requests 
app.listen(5000, () => {
	console.log("Server is running on port 5000");
});