import "../../assets/styles/home.css";
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
import Map from "../../components/map";
import Header from "../../Common/header";
import { logOutOutline } from "ionicons/icons";
import { Autocomplete, TextField } from "@mui/material";
import Toast from "../../components/toast";
import { storeLocal, deleteLocal } from "../../localStorage/saveLocal";

export default function Home(props) {
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
								src={require("../../assets/logo/goc_logo.svg").default}
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
							<IonItem routerLink={"/history"}>History</IonItem>
						</IonList>
					</IonContent>
					<IonItem
						button
						onClick={async () => {
							// await deleteLocal("remember");
							await storeLocal("remember", "false");
							console.log("SSSSSSS");
							props.history.push("/login");
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
					options={props.zones}
					style={{ transform: "translateY(-5%)" }}
					getOptionLabel={(option) => option.zone_name}
					onChange={(event, newValue) => props.onSelectedZone(newValue)}
					renderInput={(params) => (
						<TextField
							{...params}
							sx={{ width: "100vw", backgroundColor: "#fff", height: "7.8vh" }}
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
					center={props.centerProp}
					city={props.selectedCity}
					zone={props.selectedZone}
					zoom={10}
				/>
			</IonContent>
			<Toast message={props.message} toastOpen={props.toastOpen} />
		</IonPage>
	);
}
