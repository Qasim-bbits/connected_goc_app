import React, { useContext } from "react";
import "../assets/styles/home.css";
import Box from "@mui/material/Box";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import { IonButton } from "@ionic/react";
import { isPointInPolygon } from "geolib";
import { globalStateContext } from "../context/GlobalStateProvider";

const containerStyle = {
	width: "100%",
	height: "90%",
};

const c = {
	lat: 25.774,
	lng: -80.19,
};

const triangleCoords = [
	{ lat: 25.774, lng: -80.19 },
	{ lat: 18.466, lng: -66.118 },
	{ lat: 32.321, lng: -64.757 },
	{ lat: 25.774, lng: -80.19 },
];
const libraries = ["drawing"];

export default function Map(props) {
	const { zone, city, user, currCoord } = useContext(globalStateContext);
	const [zoneId, setZoneId] = zone;
	const [cityId, setCityId] = city;
	const [coord, setCoord] = currCoord;

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyCLD8cITdyUJTXZCeXJAiMiThGIn6LNYYY",
		libraries,
	});

	const [map, setMap] = React.useState(null);
	const [showConfirmBtn, setShowConfirmBtn] = React.useState(false);

	// let showConfirmBtn = true;

	let mapCenter =
		props.center === null || props.center === undefined ? c : props.center;

	const [markerPosition, setMarkerPosition] = React.useState(mapCenter);

	// const toggleConfrimBtn = () => {
	// 	if (props.zone.polygon != null) {
	// 		showConfirmBtn = isPointInPolygon(mapCenter, props.zone.polygon);
	// 		console.log("ddddd", showConfirmBtn);
	// 	}

	// 	// console.log("issss", isPointInPolygon(mapCenter, props.zone.polygon));
	// };

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(mapCenter);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const setContext = () => {
		setCityId(props.city._id);
		setZoneId(props.zone._id);
		setCoord(mapCenter);
	};

	React.useEffect(() => {
		if (props.center != null) {
			mapCenter = props.center;
			console.log("prop center", props.center);
			console.log("mapCenter", mapCenter);
		} else console.log("props center is null");

		if (props.zone.polygon != null) {
			setShowConfirmBtn(isPointInPolygon(mapCenter, props.zone.polygon));
			console.log("ddddd", showConfirmBtn);
		}
	}, [map]);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	const renderMap = () => {
		const handleCenterChanged = () => {
			if (map) {
				const lat = map.getCenter().lat();
				const lng = map.getCenter().lng();

				console.log("center", lat, ":", lng);
			}
		};

		return (
			<>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={mapCenter}
					zoom={7}
					onLoad={onLoad}
					onUnmount={onUnmount}
					onCenterChanged={handleCenterChanged}
				>
					<div
						id="map_canvas"
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							alignItems: "center",
							justifyContent: "center",
							flex: 1,
						}}
						className="map-marker-centered"
					>
						<img
							src={require("../assets/logo/marker.svg").default}
							alt="eee"
							width="30"
							height="30"
						/>
					</div>

					<Box
						style={{
							marginTop: 450,
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<IonButton
							type="submit"
							style={{
								marginTop: 7,
								marginBottom: 5,
								borderRadius: 30,
								padding: 2,
								width: 200,
								display: showConfirmBtn ? "block" : "none",
								margin: "0 auto",
							}}
							onClick={() => setContext()}
							size="default"
							routerLink={"/selectPlate"}
						>
							Confirm your zone
						</IonButton>
					</Box>

					<Polygon
						path={props.city.polygon}
						// key={1}
						editable={true}
						options={{
							strokeColor: "#00008B",
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: "#00008B",
							fillOpacity: 0.35,
						}}
					/>
					<Polygon
						path={props.zone.polygon}
						editable={true}
						options={{
							strokeColor: "#63E5FF",
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: "#63E5FF",
							fillOpacity: 0.35,
						}}
					/>
				</GoogleMap>
			</>
		);
	};

	return isLoaded ? renderMap() : <></>;
}
