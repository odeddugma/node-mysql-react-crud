import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [wage, setWage] = useState(0);

	const addEmployee = () => {
		axios
			.post("http://localhost:3001/create", {
				name: name,
				age: age,
				country: country,
				position: position,
				wage: wage,
			})
			.then((response) => {
				//console.log(response);
				console.log("success");
			});
	};

	return (
		<div className="App">
			<div className="workerInfo">
				<label>Name:</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<label>Age:</label>
				<input type="number" onChange={(e) => setAge(e.target.value)} />
				<label>Country:</label>
				<input type="text" onChange={(e) => setCountry(e.target.value)} />
				<label>Position:</label>
				<input type="text" onChange={(e) => setPosition(e.target.value)} />
				<label>Wage (year):</label>
				<input type="number" onChange={(e) => setWage(e.target.value)} />
				<button onClick={addEmployee}>Add Employee</button>
			</div>
		</div>
	);
}

export default App;
