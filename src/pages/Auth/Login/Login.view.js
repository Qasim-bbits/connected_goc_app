import React, { useContext } from "react";
import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
	IonText,
} from "@ionic/react";
import "../../../assets/styles/login.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { lockClosedOutline, personOutline } from "ionicons/icons";
import { IonRouterLink } from "@ionic/react";
import Toast from "../../../components/toast";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import { useHistory } from "react-router";

import {
	storeLocal,
	retrieveLocal,
	deleteLocal,
} from "../../../localStorage/saveLocal";
// let localEmail = retrieveLocal("email");

export default function LoginView(props) {
	const { user, emailU, rememberMe } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [email, setEmail] = emailU;
	const [remember, setRemember] = rememberMe;
	const history = useHistory();

	return (
		<IonPage style={{ display: "flex" }}>
			<IonGrid>
				<IonRow>
					<IonCol size="12" offset="2">
						<img
							src={require("../../../assets/logo/goc_logo_variant.svg").default}
							alt="Connected GOC"
							style={{ marginTop: 30 }}
							height="250px"
							width="250px"
						/>
					</IonCol>
				</IonRow>
				<form onSubmit={props.handleSubmit}>
					<IonRow>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonIcon src={personOutline} />
								<IonInput
									margin="normal"
									name="email"
									type="email"
									placeholder="Email"
									style={{
										marginTop: "1%",
										marginBottom: "1%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonIcon src={lockClosedOutline} />
								<IonInput
									margin="normal"
									name="password"
									type="password"
									placeholder="Password"
									style={{
										marginTop: "1%",
										marginBottom: "1%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow style={{ display: "flex", alignItems: "center" }}>
						<IonCol size="5" offset="1">
							<IonItem className="remember-me">
								<IonLabel style={{ fontSize: "13px" }}>Remember me</IonLabel>
								<IonCheckbox
									classname="checkbox"
									checked={remember}
									onIonChange={(e) => setRemember(e.detail.checked)}
									slot="start"
									style={{ marginInlineEnd: "10px", borderColor: "red" }}
								/>
							</IonItem>
						</IonCol>
						<IonCol
							size="5"
							style={{ display: "flex", justifyContent: "flex-end" }}
						>
							<IonItem className="forget-password">
								<IonText style={{ fontSize: "13px" }}>
									<IonRouterLink routerLink={"forgotPassword"}>
										Forgot password?
									</IonRouterLink>
								</IonText>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="10" offset="1">
							<IonButton
								className="login-button"
								expand="block"
								size="medium"
								type="submit"
							>
								Login
							</IonButton>
						</IonCol>
					</IonRow>
				</form>

				{/* <Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 6 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Type your email address"
						name="email"
						autoComplete="email"
						variant="standard"
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						id="password"
						label="Type your password"
						name="password"
						autoComplete="password"
						variant="standard"
					/>

					<Grid container alignItems="center" justifyContent="center">
						<Button
							type="submit"
							variant="contained"
							sx={{
								mt: 7,
								mb: 5,
								borderRadius: 30,
								padding: 2,
								width: 200,
								display: "block",
							}}
							onClick={() => {}}
						>
							Login
						</Button>
					</Grid>
					<Grid container>
						<IonItem className="remember-me">
							<IonLabel style={{ fontSize: "13px" }}>Remember me</IonLabel>
							<IonCheckbox
								classname="checkbox"
								checked={remember}
								onIonChange={(e) => setRemember(e.detail.checked)}
								slot="start"
								style={{ marginInlineEnd: "10px", borderColor: "red" }}
							/>
						</IonItem>
					</Grid>
					<Grid container>
						<IonItem className="forget-password">
							<IonText style={{ fontSize: "13px" }}>
								<IonRouterLink routerLink={"forgotPassword"}>
									Forgot password?
								</IonRouterLink>
							</IonText>
						</IonItem>
					</Grid>
				</Box> */}
				<div style={{ display: "flex", justifyContent: "center" }}>
					<IonText style={{ fontSize: "13px" }}>
						Don't have an account? &nbsp;
						<IonRouterLink routerLink={"signup"}> Signup</IonRouterLink>
					</IonText>
				</div>
			</IonGrid>
			<Toast
				message={props.message}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
			/>
		</IonPage>
	);
}
