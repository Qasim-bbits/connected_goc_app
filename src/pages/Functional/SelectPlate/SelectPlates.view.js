import React, { useContext } from "react";
import "../../../assets/styles/selectplates.css";
import {
	carOutline,
	trashOutline,
	pencil,
	createOutline,
} from "ionicons/icons";
import {
	IonBackButton,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonButtons,
	IonPage,
	IonButton,
	IonModal,
	IonLabel,
	IonInput,
	IonCard,
	IonCardContent,
	IonIcon,
	IonText,
	IonGrid,
	IonRow,
	IonCol,
	IonListHeader,
	IonItemGroup,
} from "@ionic/react";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";

let plateId, plateData;
let bool;
let result = false;
const platesTest = [
	{
		id: 1,
		number: 3322,
	},
	{
		id: 2,
		number: 4522,
	},
];

export default function SelectPlates(props) {
	const { plateName, user } = useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [userId, setUserId] = user;

	return (
		<IonPage>
			<Header title="Select Plate" isHome={false} backLink="/home" />
			<IonContent>
				<IonCol className="ion-text-center">
					<IonModal
						isOpen={props.showModal}
						cssClass="my-custom-class"
						initialBreakpoint={-0.5}
						// initialBreakpoint={0.25}
						// breakpoints={[0.25, 0.5, 0.75]}
						// backdropBreakpoint={0.5}
						onDidDismiss={() => props.setShowModal(false)}
						id="modal"
						class="modalBottom"
					>
						<IonContent className="ion-padding modalBottom">
							{/* <form onSubmit={props.handleChange}> */}
							<IonItem>
								<IonLabel position="stacked">Enter Plate</IonLabel>
								<IonInput
									value={props.inputPlate["plate"]}
									type="text"
									placeholder="Plate"
									onIonChange={props.handleChange}
									name="plate"
								/>
							</IonItem>

							<IonButton
								color="secondary"
								onClick={() => {
									props.setShowModal(false);
									// props.getPlates().then((data) => {
									// 	setPlates(data);
									// });
									// props.getPlates();
									// setInputPlateAdd(null);
								}}
							>
								Close
							</IonButton>

							<IonButton onClick={props.addPlates}>{props.button}</IonButton>
							{/* </form> */}
						</IonContent>
					</IonModal>
				</IonCol>

				<IonListHeader lines="full">
					<IonButton
						color="primary"
						fill="solid"
						onClick={() => props.setShowModal(true)}
					>
						Add plate
					</IonButton>
				</IonListHeader>

				<IonList>
					{props.plates.map((el) => (
						<IonCard class="card-background-color" key={el._id}>
							<IonCardContent>
								<IonGrid>
									<IonRow>
										<IonCol size="4">
											<IonItem
												class="card-background-color"
												button
												onClick={() => {
													props.onEditPlate(el);
													props.setShowModal(true);
												}}
												lines="none"
												detail={false}
											>
												<IonIcon icon={pencil} slot="start" color="#000" />
											</IonItem>
											<IonItem
												class="card-background-color"
												button
												onClick={async () => {
													await props.delPlates(el._id);
												}}
												lines="none"
												detail={false}
											>
												<IonIcon
													icon={trashOutline}
													slot="start"
													color="#000"
												/>
											</IonItem>
										</IonCol>
										<IonCol className="ion-align-self-center">
											<IonItem
												class="card-background-color"
												button
												onClick={() => {
													setPlate(el.plate);
												}}
												routerLink={"/selectParkingRate"}
												lines="none"
												detail={false}
											>
												<IonText>{el.plate}</IonText>
												<IonIcon icon={carOutline} slot="end" color="#000" />
											</IonItem>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCardContent>
						</IonCard>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
}
