import React, {useContext, useState} from "react";
import SelectPlates from "./SelectPlates.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import {useHistory} from "react-router";

let bool;
let result = false;
export default function SelectPlatesUtils() {
	const [loadingSkeleton, setLoadingSkeleton] = React.useState(false);
	const [addLoading, setAddLoading] = React.useState(false)
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const { user, zone, plateName } = useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [userId, setUserId] = user;
	const [zoneData, setZoneData] = zone;
	const [plates, setPlates] = React.useState([]);
	const [inputPlate, setInputPlate] = React.useState({});
	const [button, setButton] = React.useState("Add");
	const [edit, setEdit] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const [showModal, setShowModal] = React.useState(false);
	const [toastColor, setToastColor] = useState('')

	const history = useHistory();

	React.useEffect(() => {
		getPlates();
	}, []);


	const handleChange = (e) => {
		setInputPlate({ ...inputPlate, [e.target.name]: e.target.value });
	};

	const getPlates = async (data) => {
		if (loadingSkeleton) {
			return;
		}
		setLoadingSkeleton(true);
		try {
			const response = await fetch(
				"https://connectedparking.ca/api/getPlatesByUser/",
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
			setShowModal(false);
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true)
		}
		setLoadingSkeleton(false);
	};

	const addPlates = async (e) => {
		e.preventDefault();
		try {
			if (button === "Update") {
				const response = await fetch("https://connectedparking.ca/api/editPlate/", {
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
				const response = await fetch("https://connectedparking.ca/api/addPlate/", {
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
				setAddLoading(false)
				setShowModal(false);
				setMessage('Plates added successfully')
				setToastOpen(true)
			}
			getPlates();
			setButton("Add");
			inputPlate["plate"] = "";
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true)
		}
		if (!bool) {
			setMessage("Plate Could Not Be Added!");
			setToastOpen(true)
			return null;
		} else {
			return result;
		}
	};

	const delPlates = async (data) => {
		try {
			const response = await fetch("https://connectedparking.ca/api/delPlate/", {
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
			if (result.deletedCount === 0) {
				bool = false;
				setMessage("Plate deleted successfully")
				setToastOpen(true)
			} else {
				bool = true;
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true)
		}
		if (!bool) {
			setMessage("Plates Could Not Be Deleted!");
			setToastOpen(true)
			return null;
		} else {
			getPlates();
		}
	};

	const editPlates = async (...data) => {
		try {
			const response = await fetch("https://connectedparking.ca/api/editPlate/", {
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
			setShowModal(false);
			if (result.plate) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true)
		}
		if (!bool) {
			setMessage("Plate edited successfully");
			setToastOpen(true)
			return null;
		} else {
			setMessage("Unable to edit plate");
			setToastOpen(true)
		}}

	const onEditPlate = (e) => {
		inputPlate["plate"] = e.plate;
		setEdit(e);
		setButton("Update");
	};

	const getRates = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(
				'https://connectedparking.ca/api/getRateById',
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: zoneData?._id,
						plate: plate,
					}),
				}
			);
			result = await response.json();
			if (result.success === false) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true);
		}
		setLoading(false);
		if (!bool) {
			if (result.msg) {
				setToastColor('primary')
				setMessage(result.msg);
				setToastOpen(true);
			} else {
				setMessage("Rates Could Not be Fetched!");
				setToastOpen(true);
			}
			return null;
		} else {
			history.push('/selectParkingRate')
			return result;
		}
	};

	return (
		<SelectPlates
			plates={plates}
			getRates={getRates}
			addLoading={addLoading}
			setAddLoading={setAddLoading}
			loading={loadingSkeleton}
			setLoading={setLoadingSkeleton}
			editPlates={editPlates}
			message={message}
			toastOpen={toastOpen}
			toastColor={toastColor}
			setToastOpen={setToastOpen}
			delPlates={(e) => delPlates(e)}
			addPlates={(e) => addPlates(e)}
			handleChange={(e) => handleChange(e)}
			inputPlate={inputPlate}
			onEditPlate={(e) => onEditPlate(e)}
			button={button}
			setShowModal={setShowModal}
			showModal={showModal}
		/>
	);
}
