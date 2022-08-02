import React, { useState, useContext } from "react";
import SelectPlates from "./SelectPlates.view";
import { globalStateContext } from "../../context/GlobalStateProvider";

let bool;
let result = false;
export default function SelectPlatesUtils() {
	const [loading, setLoading] = React.useState(false);
	const { plateName, user } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [plate, setPlate] = plateName;

	const [plates, setPlates] = React.useState([]);
	const [inputPlate, setInputPlate] = React.useState({});
	const [button, setButton] = React.useState("Add");
	const [edit, setEdit] = React.useState({});

	const [showModal, setShowModal] = React.useState(false);

	React.useEffect(() => {
		getPlates();
		console.log(plates, "plates");
	}, []);

	const handleChange = (e) => {
		setInputPlate({ ...inputPlate, [e.target.name]: e.target.value });
	};

	const getPlates = async () => {
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
					}),
				}
			);
			result = await response.json();
			setPlates(result);
			console.log(result);
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
	};
	const addPlates = async (e) => {
		console.log("input plate", inputPlate);
		try {
			if (button === "Update") {
				const response = await fetch("http://35.192.138.41/api/editPlate/", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						plate: inputPlate["plate"],
						id: edit._id,
					}),
				});
				result = await response.json();
			} else {
				const response = await fetch("http://35.192.138.41/api/addPlate/", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						plate: inputPlate["plate"],
						user_id: userId,
					}),
				});
				result = await response.json();
				console.log(result);
			}
			getPlates();
			setButton("Add");
			inputPlate["plate"] = "";
			setShowModal(false);
		} catch (e) {
			alert("Oops", e.message);
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
		} else {
			getPlates();
		}
	};

	const onEditPlate = (e) => {
		console.log(e);
		inputPlate["plate"] = e.plate;
		setEdit(e);
		setButton("Update");
	};

	return (
		<SelectPlates
			//Variables
			plates={plates}
			inputPlate={inputPlate}
			button={button}
			showModal={showModal}
			setPlate={setPlate}
			//Functions
			delPlates={(e) => delPlates(e)}
			addPlates={(e) => addPlates(e)}
			handleChange={(e) => handleChange(e)}
			setShowModal={setShowModal}
			onEditPlate={(e) => onEditPlate(e)}
		/>
	);
}
