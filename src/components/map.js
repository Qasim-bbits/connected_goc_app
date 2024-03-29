import React, { useContext } from "react";
import "../assets/styles/home.css";
import Box from "@mui/material/Box";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import { IonButton, IonSpinner } from "@ionic/react";
import { isPointInPolygon } from "geolib";
import { globalStateContext } from "../context/GlobalStateProvider";

const containerStyle = {
	width: "100%",
	height: "92%",
	transform: "translateY(-1%)",
};

const c = {
	lat: 45.421479,
	lng: -75.692766,
};

const libraries = ["drawing"];

export default function Map(props) {
	const { zone, city, currCoord } = useContext(globalStateContext);
	const [zoneData, setZoneData] = zone;
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
		}
	};

	const onLoad = (map) => {
		setMap(map);
	};

	const setContext = () => {
		setCityId(props.city._id);
		setZoneData(props.zone);
		setCoord(mapCenter);
	};

	React.useEffect(() => {
		if (props.center != null) {
			mapCenter = props.center;
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
				let tempCenter = { lat: Tlat, lng: Tlng };
				if (map.getZoom() != 10 && props.zone.polygon == null) map.setZoom(10);
				else if (props.zone.polygon != null) map.setZoom(20);
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
						sx={{
							display: "flex",
							height: "100%",
							flexDirection: "column",
							justifyContent: "flex-end",
							paddingBottom: "20%",
						}}
					>
						<IonButton
							type="submit"
							style={{
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

	return isLoaded ? (
		renderMap()
	) : (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<IonSpinner name="crescent" />
		</div>
	);
}
