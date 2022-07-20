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
	IonRow,
	IonGrid,
} from "@ionic/react";
import { getCenterOfBounds } from "geolib";
import Map from "../../../components/map";
import Header from "../../../Common/header";
import { logOutOutline } from "ionicons/icons";
import { Autocomplete, TextField } from "@mui/material";
import Toast from "../../../components/toast";
import { useHistory } from "react-router";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import { storeLocal, deleteLocal } from "../../../localStorage/saveLocal";

export default function Home(props) {
	const { user, emailU, rememberMe } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [email, setEmail] = emailU;
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

	const onSelectedCity = async (e) => {
		setSelectedCity(e);
		console.log(e);
		const citiesP = e.polygon.map(function (row) {
			return { latitude: row.lat, longitude: row.lng };
		});
		let centerPolygon = getCenterOfBounds(citiesP);
		let centerPolygonLatLng = {
			lat: centerPolygon.latitude,
			lng: centerPolygon.longitude,
		};
		setCenterProp(centerPolygonLatLng);
	};

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

	const getCities = async () => {
		try {
			const response = await fetch("http://35.192.138.41/api/getCities").then(
				(response) => response.json()
			);
			setCities(response);
			console.log(response);
		} catch (e) {
			setMessage("Cities could not be fetched");
			setToastOpen(true);
		}
	};

	const getZones = async () => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/getZonesById/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: selectedCity._id,
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

	React.useEffect(() => {
		getZones();
	}, [selectedCity]);

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
							<IonItem>History</IonItem>
						</IonList>
					</IonContent>
					<IonItem
						button
						onClick={async () => {
							// await deleteLocal("remember");
							await storeLocal("remember", "false");
							console.log("SSSSSSS");
							history.push("/login");
						}}
					>
						<IonIcon src={logOutOutline} slot="start" />
						<IonLabel>Logout</IonLabel>
					</IonItem>
				</IonMenu>
				<IonRouterOutlet id="menuContent"></IonRouterOutlet>
				<IonGrid
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "#fff",
					}}
				>
					<IonRow>
						<Autocomplete
							freeSolo
							id="free-solo-2-demo"
							disableClearable
							options={cities}
							getOptionLabel={(option) => option.city_name}
							onChange={(event, newValue) => onSelectedCity(newValue)}
							renderInput={(params) => (
								<TextField
									{...params}
									sx={{ width: 300, backgroundColor: "#fff" }}
									label="Search City"
									variant="outlined"
									fullWidth
									size="small"
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
								/>
							)}
						/>
					</IonRow>
					<IonRow>
						<Autocomplete
							freeSolo
							id="free-solo-2-demo"
							disableClearable
							options={zones}
							getOptionLabel={(option) => option.zone_name}
							onChange={(event, newValue) => onSelectedZone(newValue)}
							renderInput={(params) => (
								<TextField
									{...params}
									sx={{ width: 300, backgroundColor: "#fff" }}
									label="Search Zone"
									variant="outlined"
									fullWidth
									size="small"
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
								/>
							)}
						/>
					</IonRow>
				</IonGrid>
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
