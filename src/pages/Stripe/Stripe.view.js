import Toast from "../../components/toast";
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
} from "@ionic/react";

export default function StripeScreen(props) {
	return (
		<IonPage>
			<IonContent>
				<form onSubmit={props.handleSubmit} style={{ backgroundColor: "#eee" }}>
					<IonRow style={{ margin: "10px", padding: "15px" }}>
						<IonCol style={{ padding: "0 10px 0 10px" }}>
							<IonLabel>Card Number</IonLabel>
							<IonItem
								// fill="outline"
								// color={incorrect ? "danger" : ""}
								style={
									props.incorrectCardNum
										? { border: "1px solid #FF0000" }
										: { border: "" }
								}
							>
								<img
									src={props.cardIcon}
									id="cardImg"
									width="10%"
									height="70%"
									item-left
									style={{ margin: "auto 0" }}
								/>
								<IonInput
									class="ion-padding"
									inputMode="tel"
									value={props.cardNum["cardNumber"]}
									name="cardNumber"
									id="cardNumber"
									onIonChange={(e) => {
										props.handleChange(e);
										// props.handleCardNum(e.target.value);
									}}
									placeholder="Card Number"
									pattern="[\d| ]{16,22}"
									maxlength={19}
									style={{
										backgroundColor: "#fff",
										borderRadius: "10px",
										marginBottom: "5px",
										color: "black",
										margin: "auto 0",
										marginLeft: "10px",
									}}
								/>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
							alignItems: "center",
							margin: "10px",
						}}
					>
						<IonCol size={4}>
							<IonLabel>Expiry Month</IonLabel>
							<IonItem
								style={
									props.incorrectDate
										? { border: "1px solid #FF0000" }
										: { border: "" }
								}
							>
								<IonInput
									type="text"
									value={props.expMonth["expiryMonth"]}
									name="expiryMonth"
									onIonChange={(e) => {
										// setExpMonth(e.target.value);
										props.handleChange(e);
									}}
									placeholder="MM"
									maxlength={2}
									minlength={2}
									style={{
										backgroundColor: "#fff",
										borderRadius: "10px",
										marginBottom: "5px",
										color: "black",
									}}
								/>
							</IonItem>
						</IonCol>
						/
						<IonCol size={3}>
							<IonLabel>Expiry Year</IonLabel>
							<IonItem
								style={
									props.incorrectDate
										? { border: "1px solid #FF0000" }
										: { border: "" }
								}
							>
								<IonInput
									type="text"
									value={props.expYear["expiryYear"]}
									name="expiryYear"
									onIonChange={(e) => {
										// setExpYear(e.target.value);
										props.handleChange(e);
									}}
									placeholder="YY"
									maxlength={2}
									minlength={2}
									style={{
										backgroundColor: "#fff",
										borderRadius: "10px",
										marginBottom: "5px",
										color: "black",
									}}
								/>
							</IonItem>
						</IonCol>
						<IonCol size={3}>
							<IonLabel>CVC</IonLabel>
							<IonItem
								style={
									props.incorrectCvc
										? { border: "1px solid #FF0000" }
										: { border: "" }
								}
							>
								<IonInput
									inputMode="number"
									value={props.cvc["cvc"]}
									id="cvc"
									maxlength="3"
									name="cvc"
									onIonChange={(e) => {
										// setCvc(e.target.value);
										props.handleChange(e);
									}}
									placeholder="CVC"
									style={{
										backgroundColor: "#fff",
										borderRadius: "10px",
										marginBottom: "5px",
										color: "black",
									}}
								/>
							</IonItem>
						</IonCol>
					</IonRow>
					{/* <IonRow>
						<IonCol size={5}>
							<IonItem>
								<IonInput
									inputMode="number"
									value={amount}
									id="amount"
									maxlength="3"
									onIonChange={(e) => setAmount(e.target.value)}
									placeholder="Amount"
									style={{
										backgroundColor: "#fff",
										borderRadius: "10px",
										marginBottom: "5px",
										color: "black",
									}}
								/>
							</IonItem>
						</IonCol>
					</IonRow> */}
					<IonRow>
						<IonCol>
							<IonButton
								type="submit"
								style={{ width: "100%", marginTop: "5%" }}
							>
								{props.isLoading ? (
									<IonSpinner name="crescent" />
								) : (
									`Pay $${props.amount}`
								)}
							</IonButton>
						</IonCol>
					</IonRow>
				</form>
				<Toast
					message={props.message}
					toastOpen={props.toastOpen}
					setToastOpen={props.setToastOpen}
				/>
			</IonContent>
		</IonPage>
	);
}
