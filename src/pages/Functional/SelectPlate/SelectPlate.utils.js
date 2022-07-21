import React, {useContext, useState} from "react";
import SelectPlates from "./SelectPlates.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;
export default function SelectPlatesUtils() {
	const [loadingSkeleton, setLoadingSkeleton] = React.useState(false);
	const [addLoading, setAddLoading] = React.useState(false)
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const { user } = useContext(globalStateContext);
	const [userId, setUserId] = user;

	const [plates, setPlates] = React.useState([]);

	React.useEffect(() => {
		getPlates();
		console.log(plates, "plates");
	}, []);
	const getPlates = async (data) => {
		if (loadingSkeleton) {
			return;
		}
		setLoadingSkeleton(true);
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
			console.log(result);
			if (result.plate == "") {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true)
		}
		setLoadingSkeleton(false);
		if (!bool) {
			setMessage("Plates Could Not be Fetched!");
			setToastOpen(true)
			return null;
		} else {
			setPlates(result);
		}
	};
	const addPlates = async (data) => {
		setAddLoading(true)
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
			if (result.plate) {
				bool = false;
				setAddLoading(false)
				setMessage('Plates added successfully')
				setToastOpen(true)
			} else {
				bool = true;
			}
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
			setMessage("Plates Could Not Be Edited!");
			setToastOpen(true)
			return null;
		} else {
			return result;
		}
	};

	return (
		<SelectPlates
			getPlates={getPlates}
			plates={plates}
			addLoading={addLoading}
			setAddLoading={setAddLoading}
			loading={loadingSkeleton}
			setLoading={setLoadingSkeleton}
			editPlates={editPlates}
			delPlates={delPlates}
			addPlates={addPlates}
			message={message}
			toastOpen={toastOpen}
			setToastOpen={setToastOpen}
		/>
	);
}
