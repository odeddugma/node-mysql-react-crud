const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "employee_system",
});
/* db.connect(() => console.log("db connected!"));
db.query("SELECT * FROM employees", (error, results, fields) => {
	if (error) throw error;
	console.log(results);
});
db.end(); */

app.post("/create", (req, res) => {
	const name = req.params.name;
	const age = req.params.age;
	const country = req.params.country;
	const position = req.params.position;
	const wage = req.params.wage;

	db.query(
		"INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
		[name, age, country, position, wage],
		(error, result) => {
			if (error) throw new Error(error);
			console.log(result);
			res.send("Values Inserted");
		}
	);
});

app.listen(3001, () => console.log("listening on port 3001"));
