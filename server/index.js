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

app.put(`/employee/:id`, (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const age = req.body.age;
	const country = req.body.country;
	const position = req.body.position;
	const wage = req.body.wage;
	db.query(
		"UPDATE employees SET name = ?, age = ?, country = ?, position = ?, wage = ? WHERE id = ?",
		[name, age, country, position, wage, id],
		(error, results) => {
			if (error) throw new Error(error);
			res.status(200).json(results);
		}
	);
});

app.delete(`/employee/:id`, (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM employees WHERE id = ?", id, (error, results) => {
		if (error) throw new Error(error);
		res.status(200).send("The user deleted successfully");
	});
});

app.listen(3001, () => console.log("listening on port 3001"));
