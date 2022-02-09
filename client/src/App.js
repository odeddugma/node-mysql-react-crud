import "./App.css";
import { useState } from "react";
import axios, { Axios } from "axios";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [wage, setWage] = useState(0);

	const [employeesList, setEmployeesList] = useState([]);

	const getEmployees = () => {
		axios.get("http://localhost:3001/employees").then((response) => {
			setEmployeesList(response.data);
		});
	};

	const addEmployee = () => {
		axios
			.post("http://localhost:3001/create", {
				name: name,
				age: age,
				country: country,
				position: position,
				wage: wage,
			})
			.then(() => {
				getEmployees();
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
			<hr />
			<div className="employees">
				<button onClick={getEmployees}>Show Employees</button>

				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>name</th>
							<th>age</th>
							<th>country</th>
							<th>position</th>
							<th>wage</th>
						</tr>
					</thead>
					<tbody>
						{employeesList.map((employee) => {
							return (
								<tr key={employee.id}>
									<td>{employee.id}</td>
									<td>{employee.name}</td>
									<td>{employee.age}</td>
									<td>{employee.country}</td>
									<td>{employee.position}</td>
									<td>{employee.wage}</td>
									<td style={{ border: "none" }}>
										<button style={{ width: "50%" }}>Edit</button>
										<button style={{ width: "50%" }}>Delete</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
