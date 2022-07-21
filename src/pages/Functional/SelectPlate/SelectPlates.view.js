import React, { useContext } from "react";
import "../../../assets/styles/selectplates.css";
import {
	carOutline,
	trashOutline,
	pencil,
	createOutline,
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

let plateId, plateData;
let bool;
let result = false;

export default function SelectPlates(props) {
	const [showModalAdd, setShowModalAdd] = React.useState(false);
	const [showModalEdit, setShowModalEdit] = React.useState(false);
	const [inputPlateAdd, setInputPlateAdd] = React.useState(null);
	const [inputPlateEdit, setInputPlateEdit] = React.useState(null);
	// const [plates, setPlates] = React.useState([]);
	const { plateName, user } = useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [userId, setUserId] = user;

	const handleAddPlate = (event) => {
		setInputPlateAdd(event.target.value);

		console.log("value is:", event.target.value);
		console.log("PlateAdd:", inputPlateAdd);
	};
	const handleEditPlate = (event) => {
		setInputPlateEdit(event.target.value);

		console.log("value is:", event.target.value);
		console.log("PlateEdit:", inputPlateEdit);
	};

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
						isOpen={showModalAdd}
						cssClass="my-custom-class"
						initialBreakpoint={-0.5}
						// initialBreakpoint={0.25}
						// breakpoints={[0.25, 0.5, 0.75]}
						// backdropBreakpoint={0.5}
						onDidDismiss={() => setShowModalAdd(false)}
						id="modal"
						class="modalBottom"
					>
						<IonContent className="ion-padding modalBottom">
							<IonItem>
								<IonLabel position="stacked">Enter Plate</IonLabel>
								<IonInput
									value={inputPlateAdd}
									type="text"
									placeholder="Plate"
									onIonChange={handleAddPlate}
								/>
							</IonItem>

							<IonButton
								color="secondary"
								onClick={() => {
									setShowModalAdd(false);
									// props.getPlates().then((data) => {
									// 	setPlates(data);
									// });
									props.getPlates();
									setInputPlateAdd(null);
								}}
							>
								Close
							</IonButton>

							<IonButton
								onClick={() => {
									props.addPlates(inputPlateAdd);
									props.getPlates();
									setShowModalAdd(false);
									setInputPlateAdd(null);
								}}
							>
								Confirm
							</IonButton>
						</IonContent>
					</IonModal>

					<IonModal
						isOpen={showModalEdit}
						cssClass="my-custom-class"
						initialBreakpoint={-0.5}
						// breakpoints={[0.25, 0.5, 0.75]}
						// backdropBreakpoint={0.5}
						onDidDismiss={() => setShowModalEdit(false)}
						id="modal"
					>
						<IonContent className="ion-padding">
							<IonItem>
								<IonLabel position="stacked">Edit Plate</IonLabel>
								<IonInput
									value={inputPlateEdit}
									type="text"
									placeholder={plateData}
									onIonChange={handleEditPlate}
								/>
							</IonItem>

							<IonButton
								color="secondary"
								onClick={() => {
									setShowModalEdit(false);
									setInputPlateEdit(null);
									props.getPlates();
								}}
							>
								Close
							</IonButton>

							<IonButton
								onClick={() => {
									props.editPlates(inputPlateEdit, plateId);
									props.getPlates();
									setShowModalEdit(false);
									setInputPlateEdit(null);
								}}
							>
								Confirm
							</IonButton>
						</IonContent>
					</IonModal>
				</IonCol>

				<IonListHeader lines="full">
					<IonButton
						color="primary"
						fill="solid"
						onClick={() => setShowModalAdd(true)}
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
										<IonCol size="3" style={{
											borderRightStyle: 'solid',
											marginLeft: '-10%',
											borderWidth: '1px',
											borderColor: '#727272'
										}}>
											<IonItem
												class="card-background-color"
												button
												onClick={() => {
													plateId = el._id;
													plateData = el.plate;
													setShowModalEdit(true);
												}}
												lines="none"
												detail={false}
											>
												<IonIcon icon={pencil} slot="end" color="#000"/>
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
													props.getPlates();
												}}
												lines="none"
												detail={false}
											>
												<IonIcon
													icon={trashOutline}
													slot="end"
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
