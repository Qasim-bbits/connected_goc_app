import React, { useContext } from "react";
import "../../../assets/styles/selectparkingrate.css";
import { wifi } from "ionicons/icons";
import {
	IonBackButton,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonItem,
	IonButtons,
	IonPage,
	IonCard,
	IonCardContent,
	IonIcon,
} from "@ionic/react";

export default function SelectParkingRate(props) {
	const [rates, setRates] = React.useState([]);
	React.useEffect(() => {
		let isMounted = true;
		props.fetchRates().then((data) => {
			if (isMounted) setRates(data);
		});
		console.log(rates, "rates");
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar text-center class="ion-text-center new-background-color">
					<IonButtons slot="start">
						<IonBackButton defaultHref="selectPlate" text="" />
					</IonButtons>
					<IonTitle id="title" text-center>
						Select Parking Rate
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{rates.map((el) => (
					<IonCard class="card-background-color">
						<IonCardContent>
							<IonItem class="card-background-color" button onClick={() => {}}>
								<IonIcon icon={wifi} slot="start" color="#111" />
								<h2>{el.rate_name}</h2>
							</IonItem>
						</IonCardContent>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
}
