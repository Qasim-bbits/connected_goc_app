import React from "react";

import "../assets/styles/home.css";

// import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import {
	IonButton,
	IonFabButton,
	IonFab,
	IonGrid,
	IonRow,
	IonCol,
} from "@ionic/react";
const containerStyle = {
	width: "100%",
	height: "90%",
};

const c = {
	//   lat: -3.745,
	//   lng: -38.523

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
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyCLD8cITdyUJTXZCeXJAiMiThGIn6LNYYY",
		libraries,
	});

	const [map, setMap] = React.useState(null);

	// const [mapCenter, setMapCenter] = React.useState(
	// 	props.center === null || props.center === undefined ? c : props.center
	// );

	let mapCenter =
		props.center === null || props.center === undefined ? c : props.center;

	const [markerPosition, setMarkerPosition] = React.useState(mapCenter);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(mapCenter);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	React.useEffect(() => {
		if (props.center != null) {
			// setMapCenter(props.center);
			mapCenter = props.center;
			console.log("prop center", props.center);
			console.log("mapCenter", mapCenter);
			// console.log("actual",map.getCenter().lat(),map.getCenter().lng());
		} else console.log("props center is null");
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
							src={require("../assets/logo/result.svg").default}
							alt="eee"
							width="30"
							height="30"
						/>
					</div>

					<Box
						// alignItems='center' justifyContent='center' textAlign='center' marginBottom={0}
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
								display: "flex",
								margin: "0 auto",
							}}
							onClick={{}}
							size="default"
							routerLink={"/selectPlate"}
						>
							Confirm your zone
						</IonButton>
					</Box>

					{/* <IonFab vertical='center' horizontal='center'>

        <IonFabButton
        type="submit"
        style={{ marginTop: 7, marginBottom: 5, borderRadius: 30, padding: 2, width: 200, display:'flex',margin: '0 auto',}} 
        onClick={{}}
        size='default'
        routerLink={"/selectPlate"}
        >
            Confirm your zone
        </IonFabButton>
      </IonFab> */}

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
						// key={1}
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

// export default React.memo(Map);
