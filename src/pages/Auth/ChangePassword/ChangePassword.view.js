import React, {useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel, IonPage,
	IonRouterLink,
	IonRow,
	IonText
} from "@ionic/react";
import {lockClosedOutline, personOutline} from "ionicons/icons";
import Toast from "../../../components/toast";

export default function ChangePasswordView(props) {

	const [wrongPassword, setWrongPassword] = useState(false)
	const [matchPassword, setMatchPassword] = useState('')

	const handlePasswordChange = event => {
		setMatchPassword(event);
	};
	const handleConfirmPassword = event => {
		if (event !== matchPassword) {
			setWrongPassword(true);
		}else {
			setWrongPassword(false);
		}
	};

	return (
		<IonPage style={{ display: "flex" }}>
			<IonGrid>
				<IonRow>
					<IonCol size="12" offset="2">
						<img
							src={require("../../../assets/logo/goc_logo_variant.svg").default}
							alt="Connected GOC"
							height="200px"
							width="200px"
						/>
					</IonCol>
				</IonRow>
				<IonRow style={{marginBottom: '5%'}}>
					<IonCol size="12" offset="2">
						<IonText style={{ fontSize: "20px"}}>
							Create your new password
						</IonText>
					</IonCol>
				</IonRow>
				<form onSubmit={props.handleSubmit}>
					<IonRow>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonIcon src={lockClosedOutline} />
								<IonInput
									margin="normal"
									name="password"
									type="password"
									pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
									placeholder="Type your new password"
									style={{
										marginLeft: "20px",
									}}
									onIonChange={(e)=>handlePasswordChange(e.target.value)}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonIcon src={lockClosedOutline} />
								<IonInput
									margin="normal"
									name="password2"
									type="password"
									pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
									placeholder="Type your new password again"
									style={{
										marginLeft: "20px",
									}}
									onIonChange={(e) => handleConfirmPassword(e.target.value)}
									color={wrongPassword && 'danger'}
								/>
							</IonItem>
							{wrongPassword ? (
								<IonText style={{fontSize: '14px', color: 'red'}}>
								Passwords do not match
							</IonText>
							) : (
								<IonLabel
									style={{fontSize: '10px'}}
								>
									Include minimum eight characters, at least one letter and one number
								</IonLabel>
							)}
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="10" offset="1">
							<IonButton
								className="login-button"
								expand="block"
								size="medium"
								type="submit"
								disabled={wrongPassword}
								style={{marginTop: '10%'}}
							>
								<input type="submit" className="submit-enter" />
								Change Password
							</IonButton>
						</IonCol>
					</IonRow>
				</form>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<IonText style={{ fontSize: "13px" }}>
						Go to?&nbsp;
						<IonRouterLink routerLink={"login"}>Login</IonRouterLink>
					</IonText>
				</div>
			</IonGrid>
			<Toast
				message={props.message}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
				color={props.toastColor}
			/>
		</IonPage>
	);
}
