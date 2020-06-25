const http = require('http');
const express = require('express');
const mysql = require('./serverConnection');
const bodyparser = require('body-parser');

var app =express();
app.use(bodyparser());

// Allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// Listening Server
app.listen(3001, () => console.log("app lisenting 3001"));

//Services lists
app.get('/employee' ,(req,res) => {
	mysql.query("SELECT * FROM employee",(err,row,field) => {
		if(!err){
			res.send(row);
		}else{
			console.log(err);
		}
	})
})
// delete
app.post('/deleteemployee/' ,(req,res) => {
	console.log(req.body);
	mysql.query("DELETE FROM employee WHERE Id =?", req.body.empId,(err,row,field) => {
		if(!err){
			res.status(200).send("Deleted Succesfully");
		}else{
			console.log(err);
		}
	})

})
//update
app.post('/updateemployee',(req,res) => {
	console.log(req.body);
	const updateQuery = "UPDATE employee SET employeeName= '" + req.body.employeeName  +  "' , employeeAge=  '" + req.body.employeeAge + "', employeeMobile='" + req.body.employeeMobile + "'  WHERE Id= " + req.body.Id;
	console.log(updateQuery);
	mysql.query(updateQuery , (err,row,field) =>{
		if(!err){
			res.status(200).send("Updated Successfully");
		}else{
			res.status(400).send("Internal issue");
		}
	})
})

//addemployee
app.post('/addemployee',(req,res) => {
	console.log(req.body);
	const insertQuery = "INSERT INTO employee SET ?";
	mysql.query(insertQuery , req.body , (err,row,field) =>{
		if(!err){
			console.log(row)
			res.status(200).send(row);
		}else{
			res.status(400).send("Internal issue");
		}
	})
})

