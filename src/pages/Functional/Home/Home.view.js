import React from "react";

import "../../../assets/styles/home.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
	IonSearchbar,
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
	IonIcon,
	IonRow,
	IonGrid,
	IonCol,
	IonFooter,
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardHeader,
	IonCardTitle,
	IonAccordion,
	IonAccordionGroup,
	IonSelect,
	IonSelectOption,
} from "@ionic/react";

import Map from "../../../components/map";

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
			default: "#222222",
		},
		text: {
			primary: "#ffffff",
		},
	},
});
let citiesResponse;
let zonesResponse;
export default function Home(props) {
	const [centerProp, setCenterProp] = React.useState(null);

	const [cities, setCities] = React.useState(null);
	const [selectedCity, setSelectedCity] = React.useState({});

	const [zones, setZones] = React.useState(null);
	const [selectedZone, setSelectedZone] = React.useState({});

	const getCities = async () => {
		try {
			const response = await fetch("http://130.211.236.52/api/getCities/").then(
				(response) => response.json()
			);

			citiesResponse = await response;
		} catch (e) {
			alert("Cities Could Not Be Fetched!", e.message);
		}
	};

	const getZones = async () => {
		try {
			const response = await fetch("http://130.211.236.52/api/getZones/").then(
				(response) => response.json()
			);

			zonesResponse = await response;
		} catch (e) {
			alert("Cities Could Not Be Fetched!", e.message);
		}
	};

	const testCities = [
		{
			_id: 1,
			city_name: "Ottawa",
			polygon: [
				{ lat: 45.415421753842104, lng: -76.35184636553302 },
				{ lat: 44.95758775225658, lng: -75.82429385901366 },
				{ lat: 45.241046984450755, lng: -75.11170427931212 },
				{ lat: 45.759814362346, lng: -75.49752626169197 },
				{ lat: 45.415421753842104, lng: -76.35184636553302 },
			],
		},
		{
			_id: 1,
			city_name: "Toronto",
			polygon: [
				{ lat: 45.415421753842104, lng: -76.35184636553302 },
				{ lat: 44.95758775225658, lng: -75.82429385901366 },
				{ lat: 45.241046984450755, lng: -75.11170427931212 },
				{ lat: 45.759814362346, lng: -75.49752626169197 },
				{ lat: 45.415421753842104, lng: -76.35184636553302 },
			],
		},
	];

	// to test zones
	// const [zones, setZones] = React.useState([
	// 	{
	// 		id: 1,
	// 		name: "zone1",
	// 		polygon: [
	// 			{ lat: 45.415421753842104, lng: -76.35184636553302 },
	// 			{ lat: 44.95758775225658, lng: -75.82429385901366 },
	// 			{ lat: 45.241046984450755, lng: -75.11170427931212 },
	// 			{ lat: 45.759814362346, lng: -75.49752626169197 },
	// 			{ lat: 45.415421753842104, lng: -76.35184636553302 },
	// 		],
	// 	},
	// 	{
	// 		id: 1,
	// 		name: "zone2",
	// 		polygon: [
	// 			{ lat: 45.415421753842104, lng: -76.35184636553302 },
	// 			{ lat: 44.95758775225658, lng: -75.82429385901366 },
	// 			{ lat: 45.241046984450755, lng: -75.11170427931212 },
	// 			{ lat: 45.759814362346, lng: -75.49752626169197 },
	// 			{ lat: 45.415421753842104, lng: -76.35184636553302 },
	// 		],
	// 	},
	// ]);

	const [citySearchQuery, setCitySearchQuery] = React.useState("");
	const [zoneSearchQuery, setZoneSearchQuery] = React.useState("");

	const [cityFilteredSearch, setCityFilteredSearch] = React.useState([
		{
			_id: "",
			city_name: "",
			polygon: [],
		},
	]);

	const [zoneFilteredSearch, setZoneFilteredSearch] = React.useState([
		{
			_id: "",
			zone_name: "",
			polygon: [],
		},
	]);

	React.useEffect(async () => {
		console.log(cities, "cities");
		await getCities();
		console.log(citiesResponse, "citiesResponse");

		console.log(zones, "zones");
		await getZones();
		console.log(zonesResponse, "zonesResponse");

		let tempCitySearchResult = cities.filter((ele) =>
			ele.city_name.includes(citySearchQuery)
		);
		setCityFilteredSearch([...tempCitySearchResult]);

		let tempZoneSearchResult = zones.filter((ele) =>
			ele.zone_name.includes(zoneSearchQuery)
		);
		setZoneFilteredSearch([...tempZoneSearchResult]);
	}, [citySearchQuery, cities, zoneSearchQuery, zones]);

	return (
		<IonPage>
			<ThemeProvider theme={themeLight}>
				<IonHeader>
					<IonToolbar text-center class="ion-text-center new-background-color">
						<IonButtons slot="end">
							<IonMenuButton></IonMenuButton>
						</IonButtons>
						<IonTitle id="title">{selectedCity.city_name}</IonTitle>
					</IonToolbar>
					<IonToolbar>
						<IonSearchbar
							placeholder="Select City"
							value={citySearchQuery}
							onIonChange={(e) => setCitySearchQuery(e.detail.value)}
							onIonFocus={() => {
								setCities(citiesResponse);
							}}
						/>
						{cityFilteredSearch.map((search) => (
							<IonList key={search._id}>
								<IonItem
									button
									onclick={async () => {
										setCenterProp(search.polygon[0]);
										console.log("centerProp", centerProp);
										setSelectedCity(search);
									}}
									id="cardBtn"
								>
									<p id="searchBarCity">{search.city_name}</p>
								</IonItem>
							</IonList>
						))}

						{/* TODO: Searchbar */}
						{/* <Autocomplete
								disablePortal
								id="combo-box-demo"  
								options={citiesResponse}
								sx={{ width: 300 }}
								renderInput={(zones) => (
									<TextField {...zones.name} label="Cities" />
								)}
							/> */}

						{/* <IonSearchbar
							placeholder="Select Zone"
							value={zoneSearchQuery}
							onIonChange={(e) => setZoneSearchQuery(e.detail.value)}
							onIonFocus={() => {
								setZones(zonesResponse);
							}}
						/> */}

						<IonList>
							<IonItem>
								<IonSelect
									interface="popover"
									placeholder="Select Zone"
									onIonChange={(e) => {
										zones.map((zone) => {
											if (zone._id === e.detail.value) {
												setSelectedZone(zone);
												setCenterProp(zone.polygon[0]);
											}
										});
										console.log(e.detail.value);
									}}
									onIonCancel={() => {}}
									onIonDismiss={(e) => {
										console.log("dismissed");
									}}
									onIonFocus={() => {
										setZones(zonesResponse);
									}}
								>
									{zoneFilteredSearch.map((search) => (
										<IonSelectOption value={search._id}>
											{search.zone_name}
										</IonSelectOption>
									))}
								</IonSelect>
							</IonItem>
						</IonList>
					</IonToolbar>
				</IonHeader>

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
						<IonRouterOutlet></IonRouterOutlet>
					</IonMenu>

					<IonRouterOutlet id="menuContent"></IonRouterOutlet>

					{/* TODO: Searchbar */}
					{/* {zoneFilteredSearch.map((search) => (
						<IonList key={search._id}>
							<IonItem
								button
								onclick={async () => {
									// setCenterProp(search.polygon[0]);
									// console.log("centerProp", centerProp);
									// setSelectedCity(search.zone_name);
								}}
								id="searchBarZone"
							>
								<p id="searchBarZone">{search.zone_name}</p>
							</IonItem>
						</IonList>
					))} */}

					<Map center={centerProp} city={selectedCity} zone={selectedZone} />
				</IonContent>
			</ThemeProvider>
		</IonPage>
	);
}
