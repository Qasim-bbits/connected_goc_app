import React, { useContext } from "react";
import "../../../assets/styles/selectplates.css";
import {carOutline, trashOutline, pencil, createOutline} from "ionicons/icons";
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

let plateId;
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
	const [showModalAdd, setShowModalAdd] = React.useState(false);
	const [showModalEdit, setShowModalEdit] = React.useState(false);
	const [inputPlateAdd, setInputPlateAdd] = React.useState(null);
	const [inputPlateEdit, setInputPlateEdit] = React.useState(null);
	const [plates, setPlates] = React.useState([]);
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

	const addPlates = async (data) => {
		try {
			const response = await fetch("http://35.192.138.41/api/addPlate/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					plate: data,
					user_id: userId,
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.plate == "") {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		if (!bool) {
			alert("Plates Could Not Be Added!");
			return null;
		} else {
			return result;
		}
	};

	const delPlates = async (data) => {
		try {
			const response = await fetch("http://35.192.138.41/api/delPlate/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: data,
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.deletedCount == 0) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		if (!bool) {
			alert("Plates Could Not Be Deleted!");
			return null;
		} else {
			return result;
		}
	};

	const editPlates = async (data) => {
		try {
			const response = await fetch("http://35.192.138.41/api/editPlate/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					plate: inputPlateEdit,
					id: data,
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.deletedCount == 0) {
				bool = false;
			} else {
				bool = true;
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		if (!bool) {
			alert("Plates Could Not Be Deleted!");
			return null;
		} else {
			return result;
		}
	};

	React.useEffect(() => {
		let isMounted = true;
		props.fetchPlates().then((data) => {
			if (isMounted) setPlates(data);
		});
		console.log(plates, "plates");
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<IonPage>
			<Header
				title='Select Plates'
				isHome={false}
				backLink='/home'
			/>
			<IonContent>
				<IonCol className="ion-text-center">
					<IonModal
						isOpen={showModalAdd}
						cssClass="my-custom-class"
						initialBreakpoint={0.25}
						breakpoints={[0.25, 0.5, 0.75]}
						backdropBreakpoint={0.5}
					>
						<IonContent className="ion-padding">
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
								onClick={() => setShowModalAdd(false)}
							>
								Close
							</IonButton>

							<IonButton
								onClick={() => {
									addPlates(inputPlateAdd).then(() => setShowModalAdd(false));
									props.fetchPlates().then((data) => {
										setPlates(data);
									});
								}}
							>
								Confirm
							</IonButton>
						</IonContent>
					</IonModal>

					<IonModal
						isOpen={showModalEdit}
						cssClass="my-custom-class"
						initialBreakpoint={0.25}
						breakpoints={[0.25, 0.5, 0.75]}
						backdropBreakpoint={0.5}
					>
						<IonContent className="ion-padding">
							<IonItem>
								<IonLabel position="stacked">Enter Plate</IonLabel>
								<IonInput
									value={inputPlateEdit}
									type="text"
									placeholder="Plate"
									onIonChange={handleEditPlate}
								/>
							</IonItem>

							<IonButton
								color="secondary"
								onClick={() => setShowModalEdit(false)}
							>
								Close
							</IonButton>

							<IonButton
								onClick={() => {
									editPlates(plateId).then(() => setShowModalEdit(false));
									props.fetchPlates().then((data) => {
										setPlates(data);
									});
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
						Add plate
					</IonButton>
				</IonListHeader>

				<IonList>
					{plates.map((el) => (
						<IonCard class="card-background-color" key={el._id}>
							<IonCardContent>
								<IonGrid>
									<IonRow>
										<IonCol size="4">
											<IonItem
												class="card-background-color"
												button
												onClick={() => {
													plateId = el._id;
													setShowModalEdit(true);
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
													await delPlates(el._id);
													props.fetchPlates().then((data) => {
														setPlates(data);
													});
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
