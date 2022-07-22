import {
	IonButton,
	IonCol,
	IonGrid,
	IonInput,
	IonItem,
	IonPage,
	IonRouterLink,
	IonRow,
	IonText
} from "@ionic/react";
import React from "react";
import Toast from "../../../components/toast";

export default function SignupView(props) {
	return (
		<IonPage style={{ display: "flex" }}>
			<IonGrid>
				<IonRow>
					<IonCol size="12" offset="2">
						<img
							src={require("../../../assets/logo/goc_logo_variant.svg").default}
							alt="Connected GOC"
							height="220px"
							width="220px"
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
									placeholder="Type your first name*"
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
									placeholder="Type your last name*"
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
									placeholder="Type your address here (Optional)"
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
									name="number"
									type="tel"
									placeholder="Type your phone number here (Optional)"
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
									placeholder="Type your email here*"
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
									type="password"
									required
									placeholder="Type your password here*"
									style={{
										marginTop: "1%",
										marginBottom: "2%",
										padding: "5px",
									}}
								/>
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
								Signup
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
			/>
		</IonPage>
	);
}
