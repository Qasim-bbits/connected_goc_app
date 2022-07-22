import React, { useContext } from "react";
import "../../../assets/styles/home.css";
import {
	IonMenu,
	IonHeader,
	IonToolbar,
	IonContent,
	IonList,
	IonItem,
	IonRouterOutlet,
	IonPage,
	IonIcon,
	IonLabel,
} from "@ionic/react";
import { getCenterOfBounds } from "geolib";
import Map from "../../../components/map";
import Header from "../../../Common/header";
import { logOutOutline } from "ionicons/icons";
import { Autocomplete, TextField } from "@mui/material";
import Toast from "../../../components/toast";
import { useHistory } from "react-router";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import {storeLocal, deleteLocal, retrieveLocal} from "../../../localStorage/saveLocal";

export default function Home(props) {
	const { rememberMe } = useContext(globalStateContext);
	const [remember, setRemember] = rememberMe;
	const history = useHistory();

	const [loading, setLoading] = React.useState(false);
	const [centerProp, setCenterProp] = React.useState(null);
	const [cities, setCities] = React.useState(null);
	const [selectedCity, setSelectedCity] = React.useState({});
	const [zones, setZones] = React.useState(null);
	const [selectedZone, setSelectedZone] = React.useState({});
	const [message, setMessage] = React.useState("");
	const [toastOpen, setToastOpen] = React.useState(false);

	const onSelectedZone = async (zone) => {
		setSelectedZone(zone);
		const zonesP = zone.polygon.map(function (row) {
			return { latitude: row.lat, longitude: row.lng };
		});
		let centerPolygon = getCenterOfBounds(zonesP);
		let centerPolygonLatLng = {
			lat: centerPolygon.latitude,
			lng: centerPolygon.longitude,
		};
		setCenterProp(centerPolygonLatLng);
	};

	React.useEffect(async () => {
		if (await retrieveLocal("userId")) {
			history.push("/home");
		} else {
			history.push("/login");
		}
	}, []);

	const getCities = async () => {
		try {
			const response = await fetch("https://connectedparking.ca/api/getCities").then(
				(response) => response.json()
			);
			setCities(response)
			setSelectedCity(response[0]);
			console.log(response[0]);
			const citiesP = response[0].polygon.map(function (row) {
				return { latitude: row.lat, longitude: row.lng };
			});
			let centerPolygon = getCenterOfBounds(citiesP);
			let centerPolygonLatLng = {
				lat: centerPolygon.latitude,
				lng: centerPolygon.longitude,
			};
			setCenterProp(centerPolygonLatLng);
			await getZones(response[0]._id);
		} catch (e) {
			setMessage("Cities could not be fetched");
			setToastOpen(true);
		}
	};

	const getZones = async (cityId) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("https://connectedparking.ca/api/getZonesById/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: cityId,
				}),
			}).then((response) => response.json());
			setZones(response);
			console.log(zones, "zonesResponse");
		} catch (e) {
			setMessage("Zones could not be fetched");
			setToastOpen(true);
		}
		setLoading(false);
	};

	React.useEffect(async () => {
		getCities();
		if (remember) {
			storeLocal("remember", "true");
		}
	}, []);

	return (
		<IonPage>
			<Header isHome title="" />
			<IonContent>
				<IonMenu
					side="end"
					menuId="first"
					swipeGesture="true"
					contentId="menuContent"
				>
					<IonHeader>
						<IonToolbar color="primary">
							<img
								src={require("../../../assets/logo/goc_logo.svg").default}
								width="70%"
								height="70%"
								alt="error"
							/>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						<IonList>
							<IonItem>Pay for Parking</IonItem>
							<IonItem>Pay for Infraction</IonItem>
							<IonItem routerLink={'/history'}>History</IonItem>
						</IonList>
					</IonContent>
					<IonItem
						button
						onClick={async () => {
							await storeLocal("remember", "false");
							history.push("/login");
						}}
					>
						<IonIcon src={logOutOutline} slot="start" />
						<IonLabel>Logout</IonLabel>
					</IonItem>
				</IonMenu>
				<IonRouterOutlet id="menuContent"></IonRouterOutlet>
						<Autocomplete
							freeSolo
							id="free-solo-2-demo"
							disableClearable
							blurOnSelect={true}
							options={zones}
							style={{transform: 'translateY(-8%)', height: '50px'}}
							getOptionLabel={(option) => option.zone_name}
							onChange={(event, newValue) => onSelectedZone(newValue)}
							renderInput={(params) => (
								<TextField
									{...params}
									sx={{ width: '100vw', backgroundColor: '#fff'}}
									label="Search Zone"
									variant="filled"
									fullWidth
									size="small"
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
								/>
							)}
						/>
				<Map
					center={centerProp}
					city={selectedCity}
					zone={selectedZone}
					zoom={10}
				/>
			</IonContent>
			<Toast message={message} toastOpen={toastOpen} />
		</IonPage>
	);
}
