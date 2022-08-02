import "../../assets/styles/selectparkingrate.css";
import {
	IonContent,
	IonItem,
	IonPage,
	IonCard,
	IonCardContent,
	IonText,
} from "@ionic/react";
import Header from "../../Common/header";

export default function SelectParkingRate(props) {
	return (
		<IonPage>
			<Header
				title="Select Parking Rate"
				isHome={false}
				backLink="/selectPlate"
			/>
			<IonContent>
				{props.parkingPurchased ? (
					<IonContent style={{ display: "flex" }}>
						<IonItem>
							<IonText>{props.message}</IonText>
						</IonItem>
					</IonContent>
				) : (
					props.rates.map((el) => (
						<IonCard class="card-background-color">
							<IonCardContent>
								<IonItem
									class="card-background-color"
									button
									onClick={() => {
										props.setRateData(el);
									}}
									routerLink={"/selectTariff"}
								>
									<img
										src={require("../../assets/logo/rate.png")}
										width="40"
										height="40"
									/>
									<h2>{el.rate_name}</h2>
								</IonItem>
							</IonCardContent>
						</IonCard>
					))
				)}
			</IonContent>
		</IonPage>
	);
}
