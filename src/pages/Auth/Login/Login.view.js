import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonGrid,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
	IonText,
} from "@ionic/react";
import "../../../assets/styles/login.css";
import { InputAdornment } from "@mui/material";
import { lockClosedOutline, personOutline } from "ionicons/icons";
import { IonRouterLink } from "@ionic/react";
import Toast from "../../../components/toast";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import { useHistory } from "react-router";

export default function LoginView(props) {
	const { user, emailU, rememberMe } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [email, setEmail] = emailU;
	const [remember, setRemember] = rememberMe;
	const history = useHistory();
	return (
		<IonPage style={{ backgroundColor: "#ffffff", display: "flex" }}>
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
							<TextField
								fullWidth
								label="Email"
								margin="normal"
								name="email"
								type="email"
								variant="outlined"
								size="small"
								sx={{ marginTop: "1%", marginBottom: "1%" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IonIcon src={personOutline} />
										</InputAdornment>
									),
								}}
							/>
						</IonCol>
						<IonCol size="10" offset="1">
							<TextField
								fullWidth
								label="Password"
								margin="normal"
								name="password"
								type="password"
								variant="outlined"
								size="small"
								sx={{ marginTop: "1%", marginBottom: "1%" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IonIcon src={lockClosedOutline} />
										</InputAdornment>
									),
								}}
							/>
						</IonCol>
					</IonRow>
					<IonRow style={{ display: "flex", alignItems: "center" }}>
						<IonCol size="5" offset="1">
							<IonItem className="remember-me">
								<IonLabel style={{ fontSize: "13px", color: "#000" }}>
									Remember me
								</IonLabel>
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
				<div style={{ display: "flex", justifyContent: "center" }}>
					<IonText style={{ fontSize: "13px", color: "#000" }}>
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
