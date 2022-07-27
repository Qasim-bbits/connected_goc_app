import {
	IonButton,
	IonCol,
	IonGrid, IonIcon,
	IonInput,
	IonItem, IonLabel,
	IonPage,
	IonRouterLink,
	IonRow, IonSpinner,
	IonText,
} from "@ionic/react";
import React, {useState} from "react";
import Toast from "../../../components/toast";
import {eyeOffOutline, eyeOutline} from "ionicons/icons";

export default function SignupView(props) {
	const [passwordShow, setPasswordShow] = useState(false)

	return (
		<IonPage style={{ display: "flex" }}>
			<IonGrid>
				<IonRow>
					<IonCol size="12" offset="3">
						<img
							src={require("../../../assets/logo/goc_logo_variant.svg").default}
							alt="Connected GOC"
							height="200px"
							width="200px"
						/>
					</IonCol>
				</IonRow>
				<form onSubmit={props.handleSubmit}>
					<IonRow>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonInput
									margin="normal"
									name="fname"
									type="name"
									required
									placeholder="First Name*"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonInput
									margin="normal"
									name="lname"
									type="name"
									required
									placeholder="Last Name*"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonInput
									margin="normal"
									name="address"
									type="street-address"
									placeholder="Address.(Optional)"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonInput
									margin="normal"
									name="mobileNo"
									type="tel"
									placeholder="Mobile No.(Optional)"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonInput
									margin="normal"
									name="email"
									type="email"
									required
									placeholder="Email Address*"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size="10" offset="1">
							<IonItem>
								<IonInput
									margin="normal"
									name="password"
									type={passwordShow ? 'text' : 'password'}
									required
									pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
									placeholder="Password*"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
								<IonIcon
									src={passwordShow ? eyeOffOutline : eyeOutline}
									onClick={() => setPasswordShow(!passwordShow)}
									size='small'
								/>
							</IonItem>
							<IonLabel
								style={{fontSize: '10px'}}
							>
								Include minimum eight characters, at least one letter and one number
							</IonLabel>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="10" offset="1">
							<IonButton
								className="login-button"
								expand="block"
								size="medium"
								type="submit"
								style={{marginTop: '2%'}}
							>
								<input type="submit" className="submit-enter" />
								{props.loading ? (<IonSpinner name="crescent" />) : 'Signup'}
							</IonButton>
						</IonCol>
					</IonRow>
				</form>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<IonText style={{ fontSize: "13px" }}>
						Already have an account? &nbsp;
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
