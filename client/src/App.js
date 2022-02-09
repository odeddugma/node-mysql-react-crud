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

	const deleteEmployee = (employeeId) => {
		axios
			.delete(`http://localhost:3001/employee/${employeeId}`)
			.then((response) => {
				alert(response.data);
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
									<td>
										{employee.name}
										<br />
										<br />
										<br />
										<input placeholder={employee.name} type="text" />
									</td>
									<td>
										{employee.age}
										<br />
										<br />
										<br />
										<input placeholder={employee.age} type="number" />
									</td>
									<td>
										{employee.country}
										<br />
										<br />
										<br />
										<input placeholder={employee.country} type="text" />
									</td>
									<td>
										{employee.position}
										<br />
										<br />
										<br />
										<input placeholder={employee.position} type="text" />
									</td>
									<td>
										{employee.wage} <br />
										<br />
										<br />
										<input placeholder={employee.wage} type="number" />
									</td>
									<td style={{ border: "none" }}>
										<button>Edit</button>
										<button
											onClick={() => deleteEmployee(employee.id)}
											style={{ backgroundColor: "#e43" }}
										>
											Delete
										</button>
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
