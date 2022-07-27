import React, { useContext } from "react";
import "../../../assets/styles/selectparkingrate.css";
import {
	IonContent,
	IonItem,
	IonPage,
	IonCard,
	IonCardContent,
	IonSkeletonText,
	IonText,
} from "@ionic/react";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";

export default function SelectParkingRate(props) {
	const { rate, steps, selectedRate } = useContext(globalStateContext);
	const [rateData, setRateData] = rate;
	const [stepsData, setStepsData] = steps;
	const [selectedRateData, setSelectedRateData] = selectedRate;

	const handleRateClick = async (val) => {
		setSelectedRateData(val);
		await props.fetchSteps().then((data) => {
			setStepsData(data);
		});
	}

	return (
		<IonPage>
			<Header
				title="Select Parking Rate"
				isHome={false}
				backLink="/selectPlate"
			/>
			{props.loading ?
				<>
					<IonSkeletonText animated style={{display: 'flex', width: '90%', height: '80%', margin: '10% auto'}}/>
				</>
				:
				(
					<IonContent>
				{rateData?.map((el) => (
					<IonCard class="card-background-color">
						<IonCardContent>
							<IonItem
								class="card-background-color"
								button
								onClick={() => {
									handleRateClick(el)
								}}
								lines="none"
							>
								<img
									src={require("../../../assets/logo/rate.png")}
									width="40"
									height="40"
								/>
								<h2>{el.rate_name}</h2>
							</IonItem>
						</IonCardContent>
					</IonCard>
				))}
					<Toast
						message={props.message}
						toastOpen={props.toastOpen}
						setToastOpen={props.setToastOpen}
						color={props.toastColor}
						/>
			</IonContent>
				)}
		</IonPage>
	);
}
