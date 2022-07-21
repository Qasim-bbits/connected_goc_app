import React, { useContext } from "react";
import "../../../assets/styles/selectparkingrate.css";
import {
	IonContent,
	IonItem,
	IonPage,
	IonCard,
	IonCardContent,
	IonSkeletonText,
} from "@ionic/react";
import {globalStateContext} from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";

export default function SelectParkingRate(props) {
	const [rates, setRates] = React.useState([]);
	const { rate } = useContext(globalStateContext);
	const [rateData, setRateData] = rate;

	React.useEffect(() => {
		let isMounted = true;
		props.fetchRates().then((data) => {
			if (isMounted) {
				setRates(data);
			}
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
			{props.loading ?
				<>
					<IonSkeletonText animated style={{display: 'flex', width: '90%', height: '80%', margin: '10% auto'}}/>
				</>
				:(<IonContent>
				{rates.map((el) => (
					<IonCard class="card-background-color">
						<IonCardContent>
							<IonItem
								class="card-background-color"
								button
								onClick={() => {
									setRateData(el)
								}}
								routerLink={"/selectTariff"}
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
						/>
			</IonContent>)}
		</IonPage>
	);
}
