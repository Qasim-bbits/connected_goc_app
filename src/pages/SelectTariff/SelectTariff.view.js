import { CircleSlider } from "react-circle-slider";
import "../../assets/styles/SelectTariff.css";
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
import Header from "../../Common/header";

let moment = require("moment-timezone");

export default function SelectTariff(props) {
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
			) : props.stepData?.length ? (
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
								{props.stepDate?.[props.step]?.day}
							</IonText>
						</IonItem>
						<IonItem>
							<IonText style={{ color: "#fff" }}>
								{moment(
									props.stepDate?.[props.step]?.time_desc,
									"MMMM Do YYYY, hh:mm a"
								).format("MMM Do YYYY")}
							</IonText>
							<IonText style={{ color: "#fff", fontSize: "30px" }} slot="end">
								{moment(
									props.stepDate?.[props.step]?.time_desc,
									"MMM Do YYYY, hh:mm a"
								).format("hh:mm a")}
							</IonText>
						</IonItem>
					</IonCard>
					<Divider sx={{ width: "80%" }} />
					<div className="tax-info">
						<IonText>Total (incl. 5% GST):</IonText>
						<IonText>
							CA${(props.stepDate?.[props.step]?.rate / 100).toFixed(2)}
						</IonText>
					</div>
					<div className="tax-info">
						<IonText>Service Fee</IonText>
						<IonText>
							CA${(props.stepDate?.[props.step].service_fee / 100).toFixed(2)}
						</IonText>
					</div>
					<IonContent style={{ height: "80vh" }}>
						<div className="rate-cycle-text">
							<IonText align="center">
								<h5>{props.stepDate?.[props.step]?.time_diff}</h5>
							</IonText>
							<IonText align="center">
								<h5>
									CA${(props.stepDate?.[props.step]?.total / 100).toFixed(2)}
								</h5>
							</IonText>
						</div>
						<div className="rate-cycle">
							<CircleSlider
								value={props.step}
								min={0}
								max={props.stepDate?.length - 1}
								onChange={(e) => props.setStep(e)}
								size={280}
							/>
						</div>
						<div className="payment-button">
							<PaymentForm
								amount={props.stepDate?.[props.step]?.total / 100}
								user={props.userId}
								city={props.cityId}
								zone={props.zoneId}
								currentCoordinates={props.coord}
								plate={props.plate}
								serviceFee={props.stepDate?.[props.step]?.service_fee}
								to={props.stepDate?.[props.step]?.time_desc}
								from={props.stepDate?.[props.step]?.current_time}
								stepDate={props.setStepData?.[props.step]}
							/>
						</div>
					</IonContent>
				</IonContent>
			) : (
				<IonSkeletonText animated style={{ width: "60%" }} />
			)}
		</IonPage>
	);
}
