import React, { useContext } from "react";
import "../assets/styles/home.css";
import Box from "@mui/material/Box";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import { IonButton } from "@ionic/react";
import { isPointInPolygon } from "geolib";
import { globalStateContext } from "../context/GlobalStateProvider";

const containerStyle = {
	width: "100%",
	height: "80%",
};

const c = {
	lat: 45.421479,
	lng: -75.692766,
};

const libraries = ["drawing"];

export default function Map(props) {
	const { zone, city, currCoord } = useContext(globalStateContext);
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
	let mapCenter =
		props.center === null || props.center === undefined ? c : props.center;

	const toggleConfrimBtn = (centerC) => {
		if (props.zone.polygon != null) {
			setShowConfirmBtn(isPointInPolygon(centerC, props.zone.polygon));
			console.log("ddddd", showConfirmBtn);
		}
	};

	const onLoad = (map) => {
		setMap(map);
	};

	// const onLoad = React.useCallback(function callback(map) {
	// 	const bounds = new window.google.maps.LatLngBounds(mapCenter);
	// 	map.fitBounds(bounds);
	// 	setMap(map);
	// }, []);

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

		toggleConfrimBtn(mapCenter);
	}, [map]);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	const renderMap = () => {
		const handleCenterChanged = () => {
			if (map) {
				const Tlat = map.getCenter().lat();
				const Tlng = map.getCenter().lng();
				console.log("center", Tlat, ":", Tlng);
				let tempCenter = { lat: Tlat, lng: Tlng };
				if (map.getZoom() != 10 && props.zone.polygon == null) map.setZoom(10);
				else if (props.zone.polygon != null) map.setZoom(20);
				console.log("curr zoom", map.getZoom());

				toggleConfrimBtn(tempCenter);
			}
		};

		return (
			<>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={mapCenter}
					zoom={props.zoom}
					onLoad={onLoad}
					onUnmount={onUnmount}
					onCenterChanged={handleCenterChanged}
					onZoomChanged={() => console.log("zoom Changed")}
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
						editable={false}
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
						editable={false}
						options={{
							strokeColor: "#63E5FF",
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: "#63E5FF",
							fillOpacity: 0.35,
						}}
						onLoad={() => {
							if (map.getZoom() != 3) map.setZoom(3);
						}}
					/>
				</GoogleMap>
			</>
		);
	};

	return isLoaded ? renderMap() : <></>;
}
