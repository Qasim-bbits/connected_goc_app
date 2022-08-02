import React, { useContext } from "react";
import Home from "./Home.view";
import { getCenterOfBounds } from "geolib";
import { useHistory } from "react-router";
import { globalStateContext } from "../../context/GlobalStateProvider";
import { storeLocal, deleteLocal } from "../../localStorage/saveLocal";

export default function HomeUtils() {
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

	const getCities = async () => {
		try {
			const response = await fetch("http://35.192.138.41/api/getCities").then(
				(response) => response.json()
			);
			setCities(response);
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
			const response = await fetch("http://35.192.138.41/api/getZonesById/", {
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
		<Home
			//Variables
			history={history}
			message={message}
			toastOpen={toastOpen}
			centerProp={centerProp}
			selectedCity={selectedCity}
			selectedZone={selectedZone}
			zones={zones}
			//Functions
			onSelectedZone={onSelectedZone}
		/>
	);
}
