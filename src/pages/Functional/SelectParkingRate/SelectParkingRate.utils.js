import React, { useState, useContext } from "react";
import SelectParkingRate from "./SelectParkingRate.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;
export default function SelectParkingRateUtils() {
	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const { zone, plateName } = useContext(globalStateContext);
	const [zoneData, setZoneData] = zone;
	const [plate, setPlate] = plateName;
	const [parkingMessage, setParkingMessage] = React.useState("");
	const [parkingPurchased, setParkingPurchased] = useState(false);

	const getRates = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(
				"https://connectedparking.ca/api/getRateById/",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: zoneData._id,
						plate: plate,
					}),
				}
			);
			result = await response.json();
			console.log(result);
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
				setParkingMessage(result.msg);
				setParkingPurchased(true);
			} else {
				// alert("Rates Could Not be Fetched!");
				setMessage("Rates Could Not be Fetched!");
				setToastOpen(true);
			}
			return null;
		} else {
			return result;
		}
	};
	return (
		<SelectParkingRate
			fetchRates={getRates}
			loading={loading}
			setLoading={setLoading}
			message={message}
			parkingMessage={parkingMessage}
			toastOpen={toastOpen}
			setToastOpen={setToastOpen}
			parkingPurchased={parkingPurchased}
		/>
	);
}
