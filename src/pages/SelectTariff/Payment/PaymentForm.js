import { useContext, useState, useEffect } from "react";
import {
	IonCol,
	IonInput,
	IonButton,
	IonRow,
	IonSpinner,
	IonList,
	IonListHeader,
	IonLabel,
	IonItem,
} from "@ionic/react";
import Toast from "../../../components/toast";
import { useHistory } from "react-router";
import { globalStateContext } from "../../../context/GlobalStateProvider";

import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";
import { usePaymentSheet } from "./payment-sheet";
import { ProcessStatus } from "./interfaces";
import { Stripe, GooglePayEventsEnum } from "@capacitor-community/stripe";

// import { Stripe } from "@awesome-cordova-plugins/stripe";

function PaymentForm(props) {
	const { stripe, isGooglePayAvailable } = useCapacitorStripe();
	// const [step, setStep] = useState < ProcessStatus > "ready";
	const { createPaymentIntent } = usePaymentSheet();

	///////////////////////////////////////////////////
	const {
		amount,
		user,
		city,
		zone,
		currentCoordinates,
		plate,
		from,
		to,
		serviceFee,
	} = props;
	const [cardNum, setCardNum] = useState("");
	const [expMonth, setExpMonth] = useState("");
	const [expYear, setExpYear] = useState("");
	const [cvv, setCvv] = useState(null);
	const [toastOpen, setToastOpen] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [message, setMessage] = useState("");
	const { payment, rate } = useContext(globalStateContext);
	const [paymentData, setPaymentData] = payment;
	const [rateData, setRateData] = rate;
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	let handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			let res = await fetch("http://localhost:3001/mobileParking", {
				method: "POST",
				body: JSON.stringify({
					cardNum: cardNum,
					expMonth: expMonth,
					expYear: expYear,
					cvv: cvv,
					amount: amount.toString(),
					service_fee: serviceFee,
					user: user,
					city: city,
					zone: zone,
					rate: rateData._id,
					coord: currentCoordinates,
					plate: plate,
					from: from,
					to: to,
				}),
				headers: { "Content-Type": "application/json" },
			});
			let resJson = await res.json();
			console.log(resJson);
			setPaymentData(resJson);
			setIsLoading(false);
			if (res.status === 200) {
				setMessage("Payment Successful");
				setToastOpen(true);
				history.push("/purchaseReceipt");
			} else {
				setMessage("Payment Failed. Something went wrong");
				setToastOpen(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleCardNum = (value) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length > 0) {
			setCardNum(parts.join(" "));
		} else {
			setCardNum(value);
		}
		console.log(cardNum);
	};

	// const handleStripe = () => {
	// 	Stripe.setPublishableKey(
	// 		"pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA"
	// 	);
	// 	let card = {
	// 		number: "4242424242424242",
	// 		expMonth: 12,
	// 		expYear: 2020,
	// 		cvc: "220",
	// 	};
	// 	Stripe.createCardToken(card)
	// 		.then((token) => alert(token.id))
	// 		.catch((error) => console.error(error));
	// };

	// useEffect(() => {
	// 	// console.log("hhhh");
	// 	handleStripe();
	// }, []);

	return (
		// <>
		// 	{isFormVisible ? (
		// 		<>
		// 			<form onSubmit={handleSubmit}>
		// 				<IonRow>
		// 					<IonCol style={{ padding: "0 10px 0 10px" }}>
		// 						<IonInput
		// 							inputMode="tel"
		// 							value={cardNum}
		// 							onIonChange={(e) => handleCardNum(e.target.value)}
		// 							placeholder="Card Number"
		// 							pattern="[\d| ]{16,22}"
		// 							maxlength={19}
		// 							style={{
		// 								backgroundColor: "#fff",
		// 								borderRadius: "10px",
		// 								marginBottom: "5px",
		// 								color: "black",
		// 							}}
		// 						/>
		// 					</IonCol>
		// 				</IonRow>
		// 				<IonRow
		// 					style={{
		// 						display: "flex",
		// 						flexDirection: "row",
		// 						justifyContent: "space-evenly",
		// 						alignItems: "center",
		// 					}}
		// 				>
		// 					<IonCol size={3}>
		// 						<IonInput
		// 							type="text"
		// 							value={expMonth}
		// 							onIonChange={(e) => setExpMonth(e.target.value)}
		// 							placeholder="MM"
		// 							maxlength={2}
		// 							minlength={2}
		// 							style={{
		// 								backgroundColor: "#fff",
		// 								borderRadius: "10px",
		// 								marginBottom: "5px",
		// 								color: "black",
		// 							}}
		// 						/>
		// 					</IonCol>

		// 					<IonCol size={3}>
		// 						<IonInput
		// 							type="text"
		// 							value={expYear}
		// 							onIonChange={(e) => setExpYear(e.target.value)}
		// 							placeholder="YY"
		// 							maxlength={2}
		// 							minlength={2}
		// 							style={{
		// 								backgroundColor: "#fff",
		// 								borderRadius: "10px",
		// 								marginBottom: "5px",
		// 								color: "black",
		// 							}}
		// 						/>
		// 					</IonCol>
		// 					<IonCol size={5}>
		// 						<IonInput
		// 							inputMode="number"
		// 							value={cvv}
		// 							id="cvv"
		// 							maxlength="3"
		// 							onIonChange={(e) => setCvv(e.target.value)}
		// 							placeholder="CVV"
		// 							style={{
		// 								backgroundColor: "#fff",
		// 								borderRadius: "10px",
		// 								marginBottom: "5px",
		// 								color: "black",
		// 							}}
		// 						/>
		// 					</IonCol>
		// 				</IonRow>
		// 				<IonRow>
		// 					<IonCol>
		// 						<IonButton
		// 							type="submit"
		// 							style={{ width: "100%", marginTop: "10%" }}
		// 						>
		// 							{isLoading ? (
		// 								<IonSpinner name="crescent" />
		// 							) : (
		// 								`Pay $${amount}`
		// 							)}
		// 						</IonButton>
		// 					</IonCol>
		// 				</IonRow>
		// 			</form>
		// 			<Toast
		// 				message={message}
		// 				toastOpen={toastOpen}
		// 				setToastOpen={setToastOpen}
		// 			/>
		// 		</>
		// 	) : (
		// 		<IonButton
		// 			onClick={() => setIsFormVisible(true)}
		// 			style={{ width: "80%", marginTop: "10%" }}
		// 		>
		// 			Pay ${amount}
		// 		</IonButton>
		// 	)}
		// </>

		<IonList>
			<IonListHeader>
				<IonLabel>GooglePay</IonLabel>
			</IonListHeader>
			{Stripe.isGooglePayAvailable ? (
				<>
					<IonItem
						button
						detail
						// disabled={step !== "ready"}
						onClick={async (e) => {
							e.preventDefault();
							const { paymentIntent } = await createPaymentIntent();
							try {
								await stripe.createGooglePay({
									paymentIntentClientSecret: paymentIntent,
									paymentSummaryItems: [
										{
											label: "Product Name",
											amount: 1099.0,
										},
									],
									merchantIdentifier: "merchant.com.getcapacitor.stripe",
									countryCode: "US",
									currency: "USD",
								});
								// setStep("create");
							} catch (e) {
								console.log(e);
							}
						}}
					>
						<IonLabel>Create</IonLabel>
					</IonItem>
					<IonItem
						button
						detail
						// disabled={step !== "create"}
						onClick={async (e) => {
							e.preventDefault();
							try {
								await stripe.presentGooglePay();
								// setStep("present");
							} catch (e) {
								console.log(e);
							}
						}}
					>
						<IonLabel>Present</IonLabel>
					</IonItem>
				</>
			) : (
				<IonItem button detail disabled={true}>
					<IonLabel>Your device does not support GooglePay.</IonLabel>
				</IonItem>
			)}
		</IonList>
	);
}

export default PaymentForm;
