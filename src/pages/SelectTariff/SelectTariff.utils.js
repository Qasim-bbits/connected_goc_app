import React, { useState, useContext } from "react";
import { globalStateContext } from "../../context/GlobalStateProvider";
import SelectTariff from "./SelectTariff.view";

let bool;
let result = false;
export default function SelectTariffUtils() {
	const [loading, setLoading] = React.useState(false);
	const { rate, user, city, zone, plateName, currCoord } =
		useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [rateData, setRateData] = rate;
	const [userId, setUserId] = user;
	const [cityId, setCityId] = city;
	const [zoneId, setZoneId] = zone;
	const [coord, setCoord] = currCoord;
	const [parkingUnavailable, setParkingUnavailable] = useState(false);
	const [message, setMessage] = useState("");
	const [step, setStep] = useState(0);
	const [stepData, setStepData] = useState(null);

	React.useEffect(() => {
		let isMounted = true;
		getSteps().then((data) => {
			if (isMounted) setStepData(data);
		});
		console.log(stepData, "step Data");
		return () => {
			isMounted = false;
		};
	}, []);

	const getSteps = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/getRateSteps/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: rateData._id,
					plate: plate,
					rate_type: rateData.rate_type,
				}),
			});
			result = await response.json();
			console.log(result);

			if (!result.some((step) => step.rate)) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {}
		setLoading(false);
		if (!bool) {
			if (result.msg) {
				setMessage(result.msg);
				setParkingUnavailable(true);
			} else {
				alert("Steps Could Not be Fetched!");
			}
			return null;
		} else {
			return result;
		}
	};
	return (
		<SelectTariff
			//Variables
			message={message}
			parkingUnavailable={parkingUnavailable}
			stepData={stepData}
			step={step}
			userId={userId}
			cityId={cityId}
			zoneId={zoneId}
			coord={coord}
			plate={plate}
			//Functions
			setStepData={setStepData}
			setStep={setStep}
		/>
	);
}
