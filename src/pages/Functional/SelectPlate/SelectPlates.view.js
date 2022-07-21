import React, { useContext } from "react";
import "../../../assets/styles/selectplates.css";
import {
	carOutline,
	trashOutline,
	pencil,
} from "ionicons/icons";
import {
	IonContent,
	IonList,
	IonItem,
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
	IonListHeader, IonSkeletonText, IonSpinner,
} from "@ionic/react";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import {Divider} from "@mui/material";
import Toast from "../../../components/toast";

export default function SelectPlates(props) {
	const { plateName, user } = useContext(globalStateContext);
	const [plate, setPlate] = plateName;

	return (
		<IonPage>
			<Header title="Select Plate" isHome={false} backLink="/home" />
			{props.loading ?
				<>
					<IonSkeletonText animated style={{display: 'flex', width: '90%', height: '80%', margin: '10% auto'}}/>
				</>
				:(<IonContent>
				<IonCol className="ion-text-center">
					<IonModal
						isOpen={props.showModal}
						cssClass="my-custom-class"
						initialBreakpoint={-0.5}
						onDidDismiss={() => props.setShowModal(false)}
						id="modal"
						class="modalBottom"
					>
						<IonContent className="ion-padding modalBottom">
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
								}}
							>
								Close
							</IonButton>
							<IonButton onClick={props.addPlates}>
								{props.button}
							</IonButton>
						</IonContent>
					</IonModal>
				</IonCol>

				<IonListHeader lines="full">
					<IonButton
						color="primary"
						fill="solid"
						onClick={() => props.setShowModal(true)}
					>
						{props.addLoading ? <IonSpinner name="crescent" /> : `Add plate`}
					</IonButton>
				</IonListHeader>

				<IonList>
					{props.plates.map((el) => (
						<IonCard class="card-background-color" key={el._id}>
							<IonCardContent>
								<IonGrid>
									<IonRow>
										<IonCol
											size="3"
											style={{
												borderRightStyle: "solid",
												marginLeft: "-10%",
												borderWidth: "2px",
												borderColor: "#727272",
											}}
										>
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
												<IonIcon icon={pencil} slot="end" color="#000" />
											</IonItem>
											<Divider
												variant='middle'
												sx={{width: '80%', backgroundColor: '#727272', borderBottomWidth: '0.5px'}}
											/>
											<IonItem
												class="card-background-color"
												button
												onClick={async () => {
													await props.delPlates(el._id);
												}}
												lines="none"
												detail={false}
											>
												<IonIcon icon={trashOutline} slot="end" color="#000" />
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
												<IonIcon icon={carOutline} slot="end" color="#000"/>
											</IonItem>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCardContent>
						</IonCard>
					))}
				</IonList>
			</IonContent>)}
			<Toast
				message={props.message}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
			/>
		</IonPage>
	);
}
