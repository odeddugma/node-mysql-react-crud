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

app.get("/employees", (req, res) => {
	db.query("SELECT * FROM employees", (error, results) => {
		if (error) throw new Error(error);
		res.status(200).json(results);
	});
});

app.post("/create", (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	const country = req.body.country;
	const position = req.body.position;
	const wage = req.body.wage;

	if (!name || !age || !country || !position || !wage) {
		res.status(400);
		throw new Error("Invalid request");
	}
	db.query(
		"INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
		[name, age, country, position, wage],
		(error, results) => {
			if (error) throw new Error(error);
			res.status(201).json(results);
		}
	);
});

app.listen(3001, () => console.log("listening on port 3001"));
