const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
	const name = req.body.name;
	const age = req.body.age;
	const country = req.body.country;
	const position = req.body.position;
	const wage = req.body.wage;
	console.log(req.body);
	db.query(
		"INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
		[name, age, country, position, wage],
		(error, result) => {
			if (error) throw new Error(error);
			console.log(result);
			//res.send("Values Inserted");
			res.status(201).json(result);
		}
	);
});

app.listen(3001, () => console.log("listening on port 3001"));
