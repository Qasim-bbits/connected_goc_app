import React, { useState, useContext } from "react";
import SelectPlates from "./SelectPlates.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;
export default function SelectPlatesUtils() {
	const [loading, setLoading] = React.useState(false);
	const { user } = useContext(globalStateContext);
	const [userId, setUserId] = user;

	const [plates, setPlates] = React.useState([]);

	React.useEffect(() => {
		getPlates();
		console.log(plates, "plates");
	}, []);
	const getPlates = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(
				"http://35.192.138.41/api/getPlatesByUser/",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: userId,
						// id: "62d020100b3d07ce4bf73c09",
					}),
				}
			);
			result = await response.json();
			console.log(result);
			if (result.plate == "") {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
		if (!bool) {
			alert("Plates Could Not be Fetched!");
			return null;
		} else {
			// return result;
			setPlates(result);
		}
	};
	const addPlates = async (data) => {
		try {
			const response = await fetch("http://35.192.138.41/api/addPlate/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					plate: data,
					user_id: userId,
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.plate == "") {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		if (!bool) {
			alert("Plates Could Not Be Added!");
			return null;
		} else {
			return result;
		}
	};

	const delPlates = async (data) => {
		try {
			const response = await fetch("http://35.192.138.41/api/delPlate/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: data,
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.deletedCount == 0) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		if (!bool) {
			alert("Plates Could Not Be Deleted!");
			return null;
		} else {
			return result;
		}
	};

	const editPlates = async (...data) => {
		try {
			const response = await fetch("http://35.192.138.41/api/editPlate/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					plate: data[0],
					id: data[1],
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.plate == "") {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		if (!bool) {
			alert("Plates Could Not Be Edited!");
			return null;
		} else {
			return result;
		}
	};

	return (
		<SelectPlates
			getPlates={getPlates}
			plates={plates}
			editPlates={editPlates}
			delPlates={delPlates}
			addPlates={addPlates}
		/>
	);
}
