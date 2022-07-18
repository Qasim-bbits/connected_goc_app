import React, { useState, useContext } from "react";
import SelectPlates from "./SelectPlates.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;
export default function SelectPlatesUtils() {
	const [loading, setLoading] = React.useState(false);
	const { user, plateName } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [plate, setPlate] = plateName;

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
			return result;
		}
	};

	return <SelectPlates fetchPlates={getPlates} />;
}
