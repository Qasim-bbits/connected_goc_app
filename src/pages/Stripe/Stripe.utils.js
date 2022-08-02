import { Stripe } from "@awesome-cordova-plugins/stripe";
import { useState, useContext, useEffect } from "react";
import { card } from "ionicons/icons";
import StripeScreen from "./Stripe.view";
// import { width } from "@mui/system";

const visaImg = require("../../assets/logo/visa.png");
const mastercardImg = require("../../assets/logo/mastercard.png");
const americanImg = require("../../assets/logo/american.png");
const paypalImg = require("../../assets/logo/paypal.png");

export default function StripeScreenUtils() {
	const [cardNum, setCardNum] = useState({});
	const [expMonth, setExpMonth] = useState({});
	const [expYear, setExpYear] = useState({});
	const [cvc, setCvc] = useState({});
	const [amount, setAmount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [cardToken, setCardToken] = useState();
	const [cardType, setCardType] = useState();
	const [message, setMessage] = useState("");
	const [toastOpen, setToastOpen] = useState(false);
	const [cardIcon, setCardIcon] = useState(card);
	const [incorrectCardNum, setIncorrectCardNum] = useState(false);
	const [incorrectCvc, setIncorrectCvc] = useState(false);
	const [incorrectDate, setIncorrectDate] = useState(false);

	// const handleStripe = async () => {
	// 	await Stripe.setPublishableKey(
	// 		"pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA"
	// 	);
	// 	let card = {
	// 		number: "4242424242424242",
	// 		expMonth: 12,
	// 		expYear: 2024,
	// 		cvc: "220",
	// 	};
	// 	await Stripe.createCardToken(card)
	// 		.then((token) => console.log(token.id))
	// 		.catch((error) => console.error(error));
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		Stripe.validateCardNumber(
			cardNum["cardNumber"],
			async () => {
				setMessage("Card Number is Valid :" + cardNum["cardNumber"]);
				setToastOpen(true);
				// findCardType();
				setIncorrectCardNum(false);

				let card = {
					number: cardNum["cardNumber"],
					expMonth: expMonth["expiryMonth"],
					expYear: expYear["expiryYear"],
					cvc: cvc["cvc"],
				};
				await Stripe.setPublishableKey(
					"pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA"
				);

				await Stripe.createCardToken(card)
					.then((token) => {
						setMessage(token.id);
						setToastOpen(true);
						setCardToken(token.id);
					})
					.catch((error) => console.error(error));

				validateDate();
				validateCvc();
			},
			() => {
				// alert("Card Number isnt Valid");
				setIncorrectCardNum(true);
				cardNum["cardNumber"] = "";
				setMessage("Card Number isnt Valid");
				setToastOpen(true);
			}
		);

		setIsLoading(false);
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
			// setCardNum(parts.join(" "));
			return parts.join(" ");
		} else {
			// setCardNum(value);
			return value;
		}
		// console.log(cardNum);
	};

	const findCardType = () => {
		Stripe.getCardType(cardNum["cardNumber"], function (ct) {
			console.log(ct);
			setCardType(ct);
			findCardIcon();
		});
	};

	const validateDate = () => {
		Stripe.validateExpiryDate(
			expMonth["expiryMonth"],
			expYear["expiryYear"],
			() => {
				console.log("Date is Valid");
				setMessage("Date is Valid");
				setToastOpen(true);
				setIncorrectDate(false);
			},
			() => {
				alert("Date isnt Valid");
				setIncorrectDate(true);
				setMessage("Date isnt Valid");
				setToastOpen(true);
				expMonth["expiryMonth"] = "";
				expYear["expiryYear"] = "";
			}
		);
	};

	const validateCvc = () => {
		Stripe.validateCVC(
			cvc["cvc"],
			() => {
				alert("Cvc is Valid");
				setMessage("Cvc is Valid");
				setToastOpen(true);
				setIncorrectCvc(false);
			},
			() => {
				alert("Cvc isnt Valid");
				setIncorrectCvc(true);
				cvc["cvc"] = "";
			}
		);
	};

	// useEffect(() => {
	// 	if (cvc["cvc"] == "") setIncorrectCvc(false);
	// }, [setIncorrectCvc]);

	// useEffect(() => {
	// 	if (cardNum["cardNumber"] == "") {
	// 		setIncorrectCardNum(false);
	// 	}
	// }, [setIncorrectCardNum]);

	useEffect(() => {
		findCardType();
		// setIncorrectCardNum(false);
		// setIncorrectCvc(false);
	}, [findCardType]);

	const findCardIcon = () => {
		switch (cardType) {
			case "Visa":
				setCardIcon(visaImg);
				break;
			case "MasterCard":
				setCardIcon(mastercardImg);
				break;
			case "Paypal":
				setCardIcon(paypalImg);
				break;
			case "American Express":
				setCardIcon(americanImg);
				break;
			default:
				console.log("NO image");
		}
	};
	const handleChange = (e) => {
		// setInputPlate({ ...inputPlate, [e.target.name]: e.target.value });
		// handleCardNum(e.target.value);
		console.log(e.target.name, e.target.value);
		switch (e.target.name) {
			case "cardNumber":
				setCardNum({
					...cardNum,
					[e.target.name]: handleCardNum(e.target.value),
				});
				break;
			case "expiryYear":
				setExpYear({ ...expYear, [e.target.name]: e.target.value });
				break;
			case "expiryMonth":
				setExpMonth({ ...expMonth, [e.target.name]: e.target.value });
				break;
			case "cvc":
				setCvc({ ...cvc, [e.target.name]: e.target.value });
				break;
		}
	};
	return (
		<StripeScreen
			incorrectCardNum={incorrectCardNum}
			incorrectCvc={incorrectCvc}
			incorrectDate={incorrectDate}
			cardIcon={cardIcon}
			cardNum={cardNum}
			expMonth={expMonth}
			expYear={expYear}
			cvc={cvc}
			isLoading={isLoading}
			amount={amount}
			message={message}
			toastOpen={toastOpen}
			setToastOpen={setToastOpen}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleCardNum={handleCardNum}
		/>
	);
}
