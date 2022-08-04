import Toast from "../../components/toast";
import { useState, useContext, useEffect } from "react";

import {
	IonContent,
	IonPage,
	IonButton,
	IonCol,
	IonInput,
	IonRow,
	IonSpinner,
	IonItem,
	IonIcon,
	IonLabel,
	IonHeader,
	IonPopover,
} from "@ionic/react";
import {
	PaymentRequestButtonElement,
	useStripe,
	PaymentElement,
} from "@stripe/react-stripe-js";

// import { Typography } from "@mui/material";

export default function StripeScreen(props) {
	// const stripe = useStripe();
	// const [paymentRequest, setPaymentRequest] = useState(null);

	// useEffect(() => {
	// 	if (stripe) {
	// 		const pr = stripe.paymentRequest({
	// 			country: "US",
	// 			currency: "usd",
	// 			total: {
	// 				label: "Demo total",
	// 				amount: 1099,
	// 			},
	// 			requestPayerName: true,
	// 			requestPayerEmail: true,
	// 		});
	// 		// Check the availability of the Payment Request API.
	// 		pr.canMakePayment().then((result) => {
	// 			if (result) {
	// 				setPaymentRequest(pr);
	// 			}
	// 		});
	// 	}
	// }, [stripe]);
	// if (paymentRequest) {
	// 	return <PaymentRequestButtonElement options={{ paymentRequest }} />;
	// }
	return (
		<form>
			<PaymentElement />
			<button>Submit</button>
		</form>
		// <IonPage>
		// 	<IonContent>
		// 		<div style={{ backgroundColor: "#eee", margin: "20px" }}>
		// 			<div className="card" style={{ padding: "5px 17px 0px 20px" }}>
		// 				<img src={props.cardImages.visa} width="12%" height="12%" />

		// 				<img src={props.cardImages.mastercard} width="12%" height="12%" />

		// 				<img src={props.cardImages.american} width="12%" height="12%" />

		// 				{/* <img src={props.cardImages.union} width="12%" height="12%" /> */}

		// 				<img src={props.cardImages.jcb} width="12%" height="12%" />

		// 				<img src={props.cardImages.discover} width="12%" height="12%" />

		// 				<img src={props.cardImages.diners} width="12%" height="12%" />
		// 			</div>
		// 			<form onSubmit={props.handleSubmit}>
		// 				<IonRow style={{ padding: "15px" }}>
		// 					<IonCol style={{ padding: "0 10px 0 10px" }}>
		// 						<IonLabel>Card Number</IonLabel>
		// 						<IonItem
		// 							// fill="outline"
		// 							// color={incorrect ? "danger" : ""}
		// 							style={
		// 								props.incorrectCardNum
		// 									? { border: "1px solid #FF0000" }
		// 									: { border: "" }
		// 							}
		// 						>
		// 							<img
		// 								src={props.cardIcon}
		// 								id="cardImg"
		// 								width="10%"
		// 								height="70%"
		// 								item-left
		// 								style={{ margin: "auto 0" }}
		// 							/>
		// 							<IonInput
		// 								class="ion-padding"
		// 								inputMode="tel"
		// 								value={props.cardNum["cardNumber"]}
		// 								name="cardNumber"
		// 								id="cardNumber"
		// 								onIonChange={props.handleChange}
		// 								placeholder="Card Number"
		// 								pattern="[\d| ]{16,22}"
		// 								maxlength={19}
		// 								style={{
		// 									backgroundColor: "#fff",
		// 									borderRadius: "10px",
		// 									marginBottom: "5px",
		// 									color: "black",
		// 									margin: "auto 0",
		// 									marginLeft: "10px",
		// 								}}
		// 							/>
		// 						</IonItem>
		// 					</IonCol>
		// 				</IonRow>
		// 				<IonRow
		// 					style={{
		// 						// display: "flex",
		// 						// flexDirection: "row",
		// 						justifyContent: "space-evenly",
		// 						alignItems: "center",
		// 						marginLeft: "20px",
		// 						marginRight: "20px",
		// 					}}
		// 				>
		// 					<IonCol>
		// 						<IonLabel>Expiry Month</IonLabel>
		// 						<IonItem
		// 							style={
		// 								props.incorrectMonth
		// 									? { border: "1px solid #FF0000" }
		// 									: { border: "" }
		// 							}
		// 						>
		// 							<IonInput
		// 								type="text"
		// 								value={props.expMonth["expiryMonth"]}
		// 								name="expiryMonth"
		// 								onIonChange={props.handleChange}
		// 								placeholder="MM"
		// 								maxlength={2}
		// 								minlength={2}
		// 								style={{
		// 									backgroundColor: "#fff",
		// 									borderRadius: "10px",
		// 									marginBottom: "5px",
		// 									color: "black",
		// 								}}
		// 							/>
		// 						</IonItem>
		// 					</IonCol>
		// 					{/* <Typography>/</Typography> */}
		// 					<IonCol>
		// 						<IonLabel>Expiry Year</IonLabel>
		// 						<IonItem
		// 							style={
		// 								props.incorrectYear
		// 									? { border: "1px solid #FF0000" }
		// 									: { border: "" }
		// 							}
		// 						>
		// 							<IonInput
		// 								type="text"
		// 								value={props.expYear["expiryYear"]}
		// 								name="expiryYear"
		// 								onIonChange={props.handleChange}
		// 								placeholder="YY"
		// 								maxlength={2}
		// 								minlength={2}
		// 								style={{
		// 									backgroundColor: "#fff",
		// 									borderRadius: "10px",
		// 									marginBottom: "5px",
		// 									color: "black",
		// 								}}
		// 							/>
		// 						</IonItem>
		// 					</IonCol>
		// 					<IonCol>
		// 						<IonLabel>CVC </IonLabel>
		// 						<img
		// 							src={require("../../assets/logo/tooltip.png")}
		// 							width="13px"
		// 							height="13px"
		// 							onClick={() => {
		// 								console.log("clicked");
		// 							}}
		// 							id="click-trigger"
		// 						/>
		// 						<IonPopover
		// 							trigger="click-trigger"
		// 							trigger-action="click"
		// 							side="top"
		// 							alignment="center"
		// 							size="auto"
		// 						>
		// 							<IonContent class="ion-padding">Hello World!</IonContent>
		// 						</IonPopover>
		// 						<IonItem
		// 							style={
		// 								props.incorrectCvc
		// 									? { border: "1px solid #FF0000" }
		// 									: { border: "" }
		// 							}
		// 						>
		// 							<IonInput
		// 								inputMode="number"
		// 								value={props.cvc["cvc"]}
		// 								id="cvc"
		// 								maxlength="3"
		// 								name="cvc"
		// 								onIonChange={props.handleChange}
		// 								placeholder="CVC"
		// 								style={{
		// 									backgroundColor: "#fff",
		// 									borderRadius: "10px",
		// 									marginBottom: "5px",
		// 									color: "black",
		// 								}}
		// 							/>
		// 						</IonItem>
		// 					</IonCol>
		// 				</IonRow>
		// 				<IonRow>
		// 					<IonCol>
		// 						<IonRow
		// 							style={{
		// 								display: "flex",
		// 								flexDirection: "row",
		// 								justifyContent: "flex-end",
		// 								margin: " 10px 20px 10px 0px",
		// 							}}
		// 						>
		// 							Total
		// 						</IonRow>
		// 						<IonRow
		// 							style={{
		// 								display: "flex",
		// 								flexDirection: "row",
		// 								justifyContent: "space-between",

		// 								margin: "0px 20px",
		// 							}}
		// 						>
		// 							<IonButton fill="clear">Back</IonButton>
		// 							<IonButton
		// 								type="submit"
		// 								style={{
		// 									width: "30%",
		// 								}}
		// 							>
		// 								{props.isLoading ? (
		// 									<IonSpinner name="crescent" />
		// 								) : (
		// 									`Pay $${props.amount}`
		// 								)}
		// 							</IonButton>
		// 						</IonRow>
		// 					</IonCol>
		// 				</IonRow>
		// 			</form>
		// 		</div>
		// 		<Toast
		// 			message={props.message}
		// 			toastOpen={props.toastOpen}
		// 			setToastOpen={props.setToastOpen}
		// 		/>
		// 	</IonContent>
		// </IonPage>
	);
}
