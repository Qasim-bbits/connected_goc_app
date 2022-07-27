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
import PaymentForm from "./Payment/PaymentForm";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";
let moment = require("moment-timezone");

export default function SelectTariff(props) {
	const [step, setStep] = useState(0);
	const { steps } = useContext(globalStateContext);
	const [stepsData, setStepsData] = steps;

	const { user, city, zone, plateName, currCoord } =
		useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [userId, setUserId] = user;
	const [cityId, setCityId] = city;
	const [zoneData, setZoneData] = zone;
	const [coord, setCoord] = currCoord;

	return (
		<IonPage>
			<Header
				title="Pay for Parking"
				isHome={false}
				backLink="/selectParkingRate"
			/>
			{stepsData?.length ? (
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
								{stepsData?.[step]?.day}
							</IonText>
						</IonItem>
						<IonItem>
							<IonText>
								{moment(
									stepsData?.[step]?.time_desc,
									"MMMM Do YYYY, hh:mm a"
								).format("MMM Do YYYY")}
							</IonText>
							<IonText style={{fontSize: "30px"}} slot="end">
								{moment(
									stepsData?.[step]?.time_desc,
									"MMM Do YYYY, hh:mm a"
								).format("hh:mm a")}
							</IonText>
						</IonItem>
					</IonCard>
					<div className="tax-info">
						<IonText>Total (incl. 5% GST):</IonText>
						<IonText>CA${(stepsData?.[step]?.rate / 100).toFixed(2)}</IonText>
					</div>
					<div className="tax-info">
						<IonText>Service Fee</IonText>
						<IonText>
							CA${(stepsData?.[step].service_fee / 100).toFixed(2)}
						</IonText>
					</div>
					<IonContent style={{height: "80vh"}}>
						<div className="rate-cycle-text">
							<IonText align="center">
								<h5>{stepsData?.[step]?.time_diff}</h5>
							</IonText>
							<IonText align="center">
								<h5>CA${(stepsData?.[step]?.total / 100).toFixed(2)}</h5>
							</IonText>
						</div>
						<div className="rate-cycle">
							<CircleSlider
								value={step}
								min={0}
								max={stepsData?.length - 1}
								knobRadius={stepsData?.length - 1 === 0 ? '0' : 10}
								onChange={(e) => setStep(e)}
								size={280}
							/>
						</div>
						<div className="payment-button">
							<PaymentForm
								amount={stepsData?.[step]?.total / 100}
								user={userId}
								city={cityId}
								zone={zoneData?._id}
								currentCoordinates={coord}
								plate={plate}
								serviceFee={stepsData?.[step]?.service_fee}
								to={stepsData?.[step]?.time_desc}
								from={stepsData?.[step]?.current_time}
								stepData={setStepsData?.[step]}
							/>
						</div>
					</IonContent>
				</IonContent>
			) : (
				<IonSkeletonText animated style={{display: 'flex', width: '90%', height: '80%', margin: '10% auto'}}/>
			)}
			<Toast
				message={props.toastMessage}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
			/>
		</IonPage>
	);
}
