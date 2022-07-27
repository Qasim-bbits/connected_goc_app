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
import React from "react";

export default function ForgotPassword(props) {
	return (
		<IonPage>
			<IonGrid style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				alignContent: 'center',
				marginTop: '-25%'
			}}>
				<IonRow style={{ marginBottom: '5%'}}>
					<IonCol size="12">
						<IonItem>
							<IonText style={{fontSize: '16px', padding: '20px'}}>
								Please write your username and we will send your password to the
								associated email address:
							</IonText>
						</IonItem>
					</IonCol>
				</IonRow>
				<form onSubmit={props.handleSubmit}>
					<IonRow>
						<IonCol size="12">
							<IonItem>
								<IonIcon src={personOutline} />
								<IonInput
									margin="normal"
									name="email"
									type="email"
									placeholder="Email"
									style={{
										marginLeft: "20px",
									}}
								/>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow style={{ marginTop: '5%', marginBottom: '10%'}}>
						<IonCol size="12">
							<IonItem>
								<IonText style={{fontSize: '16px', padding: '20px'}}>
									Don't forget to check your spam folder in case you do not find our message.
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
								<input type="submit" className="submit-enter" />
								Request
							</IonButton>
						</IonCol>
					</IonRow>
				</form>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<IonText style={{ fontSize: "13px" }}>
						Go back to&nbsp;
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
