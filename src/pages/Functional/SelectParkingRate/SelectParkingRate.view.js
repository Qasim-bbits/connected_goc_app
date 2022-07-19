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
import {globalStateContext} from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";

export default function SelectParkingRate(props) {
	const [rates, setRates] = React.useState([]);
	const { rate } = useContext(globalStateContext);
	const [rateData, setRateData] = rate;

	React.useEffect(() => {
		let isMounted = true;
		props.fetchRates().then((data) => {
			if (isMounted) {
				setRates(data)
			};
		});
		console.log(rates, "rates");
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<IonPage>
			<Header
				title='Select Parking Rate'
				isHome={false}
				backLink='/selectPlate'
			/>
			<IonContent>
				{rates.map((el) => (
					<IonCard class="card-background-color">
						<IonCardContent>
							<IonItem
								class="card-background-color"
								button
								onClick={() => {setRateData(el)}}
								routerLink={"/selectTariff"}
							>
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
