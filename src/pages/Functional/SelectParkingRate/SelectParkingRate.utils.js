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
	const [message, setMessage] = React.useState("");
	const [parkingPurchased, setParkingPurchased] = useState(false);

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
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.success == false) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
		if (!bool) {
			if (result.msg) {
				setMessage(result.msg);
				setParkingPurchased(true);
			} else {
				alert("Rates Could Not be Fetched!");
			}
			return null;
		} else {
			return result;
		}
	};
	return (
		<SelectParkingRate
			fetchRates={getRates}
			message={message}
			parkingPurchased={parkingPurchased}
		/>
	);
}
