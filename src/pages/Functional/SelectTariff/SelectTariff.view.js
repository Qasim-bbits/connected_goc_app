import React, { useContext, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import "../../../assets/styles/SelectTariff.css";
import {
	IonContent,
	IonPage,
	IonCard,
	IonText,
	IonItem,
	IonSkeletonText,
} from "@ionic/react";
import { Divider } from "@mui/material";
import PaymentForm from "./Payment/PaymentForm";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";
let moment = require("moment-timezone");

export default function SelectTariff(props) {
	const [step, setStep] = useState(0);
	const [stepData, setStepData] = useState(null);

	const { user, city, zone, plateName, currCoord } =
		useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [userId, setUserId] = user;
	const [cityId, setCityId] = city;
	const [zoneData, setZoneData] = zone;
	const [coord, setCoord] = currCoord;

	React.useEffect(() => {
		let isMounted = true;
		props.fetchSteps().then((data) => {
			if (isMounted) setStepData(data);
		});
		console.log(stepData, "step Data");
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<IonPage>
			<Header
				title="Pay for Parking"
				isHome={false}
				backLink="/selectParkingRate"
			/>
			{props.parkingUnavailable ? (
				<IonContent style={{ display: "flex" }}>
					<IonItem>
						<IonText>{props.message}</IonText>
					</IonItem>
				</IonContent>
			) : stepData?.length ? (
				<IonContent>
					<IonCard>
						<IonItem>
							<IonText>
								{moment().tz("Canada/Eastern").format("MMM Do YYYY, hh:mm a")}
							</IonText>
						</IonItem>
						<IonItem>
							<IonText
								variant="caption"
								align="left"
								style={{ color: "primary.main" }}
							>
								Your parking session will end:
							</IonText>
							<IonText
								slot="end"
								style={{
									background: "#161b40",
									color: "aliceblue",
									padding: "0 23px",
									borderRadius: "17px",
								}}
							>
								{stepData?.[step]?.day}
							</IonText>
						</IonItem>
						<IonItem>
							<IonText style={{ color: "#fff" }}>
								{moment(
									stepData?.[step]?.time_desc,
									"MMMM Do YYYY, hh:mm a"
								).format("MMM Do YYYY")}
							</IonText>
							<IonText style={{ color: "#fff", fontSize: "30px" }} slot="end">
								{moment(
									stepData?.[step]?.time_desc,
									"MMM Do YYYY, hh:mm a"
								).format("hh:mm a")}
							</IonText>
						</IonItem>
					</IonCard>
					<Divider sx={{ width: "80%" }} />
					<div className="tax-info">
						<IonText>Total (incl. 5% GST):</IonText>
						<IonText>CA${(stepData?.[step]?.rate / 100).toFixed(2)}</IonText>
					</div>
					<div className="tax-info">
						<IonText>Service Fee</IonText>
						<IonText>
							CA${(stepData?.[step].service_fee / 100).toFixed(2)}
						</IonText>
					</div>
					<IonContent style={{ height: "80vh" }}>
						<div className="rate-cycle-text">
							<IonText align="center">
								<h5>{stepData?.[step]?.time_diff}</h5>
							</IonText>
							<IonText align="center">
								<h5>CA${(stepData?.[step]?.total / 100).toFixed(2)}</h5>
							</IonText>
						</div>
						<div className="rate-cycle">
							<CircleSlider
								value={step}
								min={0}
								max={stepData?.length - 1}
								knobRadius={stepData?.length - 1 === 0 ? '0' : 10}
								onChange={(e) => setStep(e)}
								size={280}
							/>
						</div>
						<div className="payment-button">
							<PaymentForm
								amount={stepData?.[step]?.total / 100}
								user={userId}
								city={cityId}
								zone={zoneData?._id}
								currentCoordinates={coord}
								plate={plate}
								serviceFee={stepData?.[step]?.service_fee}
								to={stepData?.[step]?.time_desc}
								from={stepData?.[step]?.current_time}
								stepData={setStepData?.[step]}
							/>
						</div>
					</IonContent>
				</IonContent>
			) : (
				<IonSkeletonText animated style={{ width: "60%" }} />
			)}
			<Toast
				message={props.toastMessage}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
			/>
		</IonPage>
	);
}
