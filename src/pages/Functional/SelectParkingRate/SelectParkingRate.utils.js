import React, { useState, useContext } from "react";
import SelectParkingRate from "./SelectParkingRate.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import {useHistory} from "react-router";

let bool;
let result = false;
export default function SelectParkingRateUtils() {
	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const { zone, plateName, rate, selectedRate } = useContext(globalStateContext);
	const [selectedRateData, setSelectedRateData] = selectedRate;
	const [zoneData, setZoneData] = zone;
	const [plate, setPlate] = plateName;
	const [rateData, setRateData] = rate;
	const [toastColor, setToastColor] = useState('')
	const history = useHistory();

	const getSteps = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch('https://connectedparking.ca/api/getRateSteps', {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: selectedRateData._id,
					plate: plate,
					rate_type: selectedRateData.rate_type,
				}),
			});
			result = await response.json();

			if (result.success === false) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {

		}
		setLoading(false);
		if (!bool) {
			if(result.msg){
				setToastColor('primary')
				setMessage(result.msg);
				setToastOpen(true);
			} else {
				setMessage("Steps Could Not be Fetched!");
				setToastOpen(true)
			}
			return null;
		} else {
			history.push('/selectTariff')
			return result;
		}
	};
	return (
		<SelectParkingRate
			fetchSteps={getSteps}
			loading={loading}
			setLoading={setLoading}
			message={message}
			toastOpen={toastOpen}
			setToastOpen={setToastOpen}
			toastColor={toastColor}
		/>
	);
}
