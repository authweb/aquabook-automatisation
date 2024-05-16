import { useState, useEffect } from "react";

const useEmployeeData = () => {
	const [employees, setEmployees] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://aqua-book:80/api/employees")
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok " + response.statusText);
				}
				return response.json();
			})
			.then(data => {
				setEmployees(data.employees);
			})
			.catch(error => {
				console.error(
					"There has been a problem with your fetch operation:",
					error,
				);
				setError(error);
			});
	}, []);

	return { employees, error };
};

export default useEmployeeData;
