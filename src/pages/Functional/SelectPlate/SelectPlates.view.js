import React from "react";
import "../../../assets/styles/selectplates.css";
import Plates from "../../../components/plates";
import { carOutline, trashOutline, pencil } from "ionicons/icons";
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
	IonCol,
	IonListHeader,
	IonItemGroup,
} from "@ionic/react";

const plates = [
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
	const [showModal, setShowModal] = React.useState(false);
	const [inputPlateId, setInputPlateId] = React.useState(null);
	const [inputPlateNum, setInputPlateNum] = React.useState(null);

	const handleChangeId = (event) => {
		setInputPlateId(event.target.value);

		console.log("value is:", event.target.value);
		console.log("PlateId:", inputPlateId);
	};

	const handleChangeNum = (event) => {
		setInputPlateNum(event.target.value);

		console.log("value is:", event.target.value);
		console.log("plateNum", inputPlateNum);
	};

	return (
		<IonPage>
				<IonHeader>
					<IonToolbar text-center class="ion-text-center new-background-color">
						<IonButtons slot="start">
							<IonBackButton defaultHref="home" text="" />
						</IonButtons>
						<IonTitle id="title" text-center>
							Select Plate
						</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonCol className="ion-text-center">
						<IonModal
							isOpen={showModal}
							cssClass="my-custom-class"
							initialBreakpoint={0.25}
							breakpoints={[0.25, 0.5, 0.75]}
							backdropBreakpoint={0.5}
						>
							<IonContent className="ion-padding">
								<IonItem>
									<IonLabel position="stacked">Enter Plate Id</IonLabel>
									<IonInput
										value={inputPlateId}
										type="text"
										placeholder="Plate Id"
										onIonChange={handleChangeId}
									/>

									<IonLabel position="stacked">Enter Plate Number</IonLabel>
									<IonInput
										value={inputPlateNum}
										type="text"
										placeholder="Plate Number"
										onIonChange={handleChangeNum}
									/>
								</IonItem>

								<IonButton
									color="secondary"
									onClick={() => setShowModal(false)}
								>
									Close
								</IonButton>

								<IonButton
									onClick={() => {
										plates.push({ id: inputPlateId, number: inputPlateNum });
									}}
								>
									Confirm
								</IonButton>
							</IonContent>
						</IonModal>
					</IonCol>

					<IonListHeader lines="full">
						<IonButton
							color="secondary"
							fill="solid"
							onClick={() => setShowModal(true)}
						>
							Add plate
						</IonButton>
					</IonListHeader>

					<IonList>
						{plates.map((el) => (
							<IonCard class="card-background-color" key={el.id}>
								<IonCardContent>
									<IonItem
										class="card-background-color"
										button
										onClick={() => {}}
										routerLink={"/selectParkingRate"}
										lines="none"
										detail={false}
									>
										<IonItemGroup>
											<IonItem
												class="card-background-color"
												button
												onClick={() => {}}
												lines="none"
												detail={false}
											>
												<IonIcon icon={pencil} slot="start" color="#111" />
											</IonItem>

											<IonItem
												class="card-background-color"
												button
												onClick={() => {}}
												lines="none"
												detail={false}
											>
												<IonIcon
													icon={trashOutline}
													slot="start"
													color="#111"
												/>
											</IonItem>
										</IonItemGroup>

										<IonText>{el.number}</IonText>

										<IonIcon icon={carOutline} slot="end" color="#111" />
									</IonItem>
								</IonCardContent>
							</IonCard>
						))}
					</IonList>
				</IonContent>
		</IonPage>
	);
}
