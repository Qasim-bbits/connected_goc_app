import "../../../assets/styles/selectparkingrate.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { wifi } from "ionicons/icons";

import {
	IonSearchbar,
	IonBackButton,
	IonMenu,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonRouterOutlet,
	IonMenuButton,
	IonButtons,
	IonMenuToggle,
	IonPage,
	IonButton,
	IonModal,
	IonLabel,
	IonInput,
	IonCard,
	IonCardContent,
	IonIcon,
} from "@ionic/react";

const themeLight = createTheme({
	palette: {
		background: {
			default: "#ffffff",
		},
		text: {
			primary: "#ffffff",
		},
	},
});

const themeDark = createTheme({
	palette: {
		background: {
			default: "#ffffff",
		},
		text: {
			primary: "#ffffff",
		},
	},
});

export default function SelectParkingRate(props) {
	return (
		<IonPage>
			<ThemeProvider theme={themeLight}>
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
					<IonCard class="card-background-color">
						<IonCardContent>
							<IonItem class="card-background-color" button onClick={() => {}}>
								<IonIcon icon={wifi} slot="start" color="#111" />
								<h2>Resident Parking Rate</h2>
							</IonItem>
						</IonCardContent>
					</IonCard>

					<IonCard class="card-background-color">
						<IonCardContent>
							<IonItem class="card-background-color" button onClick={() => {}}>
								<IonIcon icon={wifi} slot="start" color="#111" />
								<h2>Visitor Parking Rate</h2>
							</IonItem>
						</IonCardContent>
					</IonCard>
				</IonContent>
			</ThemeProvider>
		</IonPage>
	);
}
