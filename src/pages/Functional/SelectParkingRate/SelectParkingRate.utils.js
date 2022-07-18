import React, { useState, useContext } from "react";
import SelectParkingRate from "./SelectParkingRate.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;
export default function SelectParkingRateUtils() {
	const [loading, setLoading] = React.useState(false);
	const { zone, plateName } = useContext(globalStateContext);
	const [zoneId, setZoneId] = zone;
	const [plate, setPlate] = plateName;
	const getRates = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/getRateById/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: zoneId,
					plate: plate,
					// id: "62c616d7eb90fdc99f09c3f3",
					// plate: "TEST",
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
		setLoading(false);
		if (!bool) {
			alert("Rates Could Not be Fetched!");
			return null;
		} else {
			return result;
		}
	};
	return <SelectParkingRate fetchRates={getRates} />;
}
