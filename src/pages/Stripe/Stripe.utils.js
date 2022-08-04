import { Stripe } from "@awesome-cordova-plugins/stripe";
import { useState, useContext, useEffect } from "react";
import { card } from "ionicons/icons";

import StripeScreen from "./Stripe.view";

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
	const [incorrectMonth, setIncorrectMonth] = useState(false);
	const [incorrectYear, setIncorrectYear] = useState(false);

	const cardImages = {
		visa: require("../../assets/logo/visa.png"),
		mastercard: require("../../assets/logo/mastercard.png"),
		american: require("../../assets/logo/american.png"),
		union: require("../../assets/logo/union.png"),
		jcb: require("../../assets/logo/jcb.png"),
		diners: require("../../assets/logo/diners.png"),
		discover: require("../../assets/logo/discover.png"),
	};

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

	// const googlePay = () => {
	// 	window.sgap
	// 		.setKey(
	// 			"pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA"
	// 		)
	// 		.then(function (output) {
	// 			window.sgap
	// 				.isReadyToPay()
	// 				.then(function () {
	// 					window.sgap
	// 						.requestPayment(amount, "USD")
	// 						.then(function (token) {
	// 							alert(token);
	// 						})
	// 						.catch(function (err) {
	// 							alert(err);
	// 						});
	// 				})
	// 				.catch(function (err) {
	// 					alert(err);
	// 				});
	// 		})
	// 		.catch(function (err) {
	// 			alert(err);
	// 		});
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
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

		// Stripe.validateCardNumber(
		// 	cardNum["cardNumber"],
		// 	async () => {
		// 		setMessage("Card Number is Valid :" + cardNum["cardNumber"]);
		// 		setToastOpen(true);
		// 		// findCardType();
		// 		setIncorrectCardNum(false);

		// 		let card = {
		// 			number: cardNum["cardNumber"],
		// 			expMonth: expMonth["expiryMonth"],
		// 			expYear: expYear["expiryYear"],
		// 			cvc: cvc["cvc"],
		// 		};
		// 		await Stripe.setPublishableKey(
		// 			"pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA"
		// 		);

		// 		await Stripe.createCardToken(card)
		// 			.then((token) => {
		// 				setMessage(token.id);
		// 				setToastOpen(true);
		// 				setCardToken(token.id);
		// 			})
		// 			.catch((error) => console.error(error));

		// 		validateDate();
		// 		validateCvc();
		// 	},
		// 	() => {
		// 		// alert("Card Number isnt Valid");
		// 		setIncorrectCardNum(true);
		// 		cardNum["cardNumber"] = "";
		// 		setMessage("Card Number isnt Valid");
		// 		setToastOpen(true);
		// 	}
		// );

		setIsLoading(false);
	};

	const handleChange = (e) => {
		console.log(e.target.name, e.target.value);
		switch (e.target.name) {
			case "cardNumber":
				setCardNum({
					...cardNum,
					[e.target.name]: handleCardNum(e.target.value),
				});
				// validateCardNum();
				break;
			case "expiryYear":
				setExpYear({ ...expYear, [e.target.name]: e.target.value });
				// validateDate();
				break;
			case "expiryMonth":
				setExpMonth({ ...expMonth, [e.target.name]: e.target.value });
				// validateDate();
				break;
			case "cvc":
				setCvc({ ...cvc, [e.target.name]: e.target.value });
				// validateCvc();
				break;
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
			// setCardNum(parts.join(" "));
			return parts.join(" ");
		} else {
			// setCardNum(value);
			return value;
		}
		// console.log(cardNum);
	};

	const validateCardNum = () => {
		if (cardNum["cardNumber"] != undefined)
			Stripe.validateCardNumber(
				cardNum["cardNumber"],
				() => {
					setMessage("Card Number is Valid :" + cardNum["cardNumber"]);
					setToastOpen(true);
					setIncorrectCardNum(false);
				},
				() => {
					// alert("Card Number isnt Valid");
					setIncorrectCardNum(true);
					setMessage("Card Number isnt Valid " + cardNum["cardNumber"]);
					setToastOpen(true);
					// cardNum["cardNumber"] = "";
				}
			);
	};

	const findCardType = () => {
		Stripe.getCardType(cardNum["cardNumber"], function (ct) {
			console.log(ct);
			setCardType(ct);
			findCardIcon();
		});
	};

	const validateDate = () => {
		if (
			expMonth["expiryMonth"] != undefined &&
			expYear["expiryYear"] != undefined &&
			expMonth["expiryMonth"] != "" &&
			expYear["expiryYear"] != ""
		) {
			Stripe.validateExpiryDate(
				expMonth["expiryMonth"],
				expYear["expiryYear"],
				() => {
					console.log("Date is Valid");
					setMessage(
						"Date is Valid " +
							expMonth["expiryMonth"] +
							" " +
							expYear["expiryYear"]
					);
					setToastOpen(true);
					setIncorrectMonth(false);
					setIncorrectYear(false);
				},
				() => {
					setIncorrectMonth(true);
					setIncorrectYear(true);

					// if (expMonth["expiryMonth"] == "") setIncorrectMonth(false);
					// if (expYear["expiryYear"] == "") setIncorrectYear(false);

					setMessage(
						"Date isnt Valid" +
							expMonth["expiryMonth"] +
							"/" +
							expYear["expiryYear"]
					);
					setToastOpen(true);
					// expMonth["expiryMonth"] = "";
					// expYear["expiryYear"] = "";
				}
			);
		} else {
			if (
				expMonth["expiryMonth"] != undefined &&
				expMonth["expiryMonth"] != ""
			) {
				if (!(expMonth["expiryMonth"] > 0 && expMonth["expiryMonth"] < 13)) {
					setIncorrectMonth(true);
				}
			} else if (expMonth["expiryMonth"] == "") setIncorrectMonth(false);

			// if (expYear["expiryYear"] != undefined) setIncorrectYear(true);
			if (expYear["expiryYear"] == "") setIncorrectYear(false);
		}
	};

	// const validateDate = () => {
	// 	if (expMonth["expiryMonth"] != undefined && expMonth["expiryMonth"] != "") {
	// 		if (!(expMonth["expiryMonth"] > 0 && expMonth["expiryMonth"] < 13)) {
	// 			setIncorrectMonth(true);
	// 		}
	// 	} else if (expMonth["expiryMonth"] == "") setIncorrectMonth(false);

	// 	if (expYear["expiryYear"] != undefined && expYear["expiryYear"] != "") {
	// 		const currYear = new Date().getFullYear();
	// 		console.log(currYear);
	// 		if (expYear["expiryYear"] < currYear) {
	// 			setIncorrectYear(true);
	// 		} else setIncorrectYear(false);
	// 	} else setIncorrectYear(false);
	// };

	const validateCvc = () => {
		console.log("validateCvc" + cvc["cvc"]);
		if (cvc["cvc"] != undefined)
			Stripe.validateCVC(
				cvc["cvc"],
				() => {
					// alert("Cvc is Valid");
					setMessage("Cvc is Valid " + cvc["cvc"]);
					setToastOpen(true);
					setIncorrectCvc(false);
				},
				() => {
					// alert("Cvc isnt Valid");
					setMessage("Cvc isnt Valid " + cvc["cvc"]);
					setToastOpen(true);
					setIncorrectCvc(true);
					// cvc["cvc"] = "";
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
		console.log("CVC:" + cvc["cvc"]);
		validateCvc();
	}, [cvc]);

	useEffect(() => {
		console.log("Card Number:" + cardNum["carNumber"]);
		validateCardNum();
	}, [cardNum]);

	useEffect(() => {
		console.log(
			"Date:" + expMonth["expiryMonth"] + " " + expYear["expiryYear"]
		);
		validateDate();
	}, [expMonth, expYear]);

	useEffect(() => {
		findCardType();
		// setIncorrectCardNum(false);
		// setIncorrectCvc(false);
	}, [findCardType]);

	const findCardIcon = () => {
		switch (cardType) {
			case "Visa":
				setCardIcon(cardImages.visa);
				break;
			case "MasterCard":
				setCardIcon(cardImages.mastercard);
				break;
			case "American Express":
				setCardIcon(cardImages.american);
				break;
			case "Discover":
				setCardIcon(cardImages.discover);
				break;
			case "JCB":
				setCardIcon(cardImages.jcb);
				break;
			case "Diners Club":
				setCardIcon(cardImages.diners);
				break;
			// case "UnionPay":
			// 	setCardIcon(cardImages.union);
			// 	break;
			default:
				console.log("NO image");
		}
	};

	return (
		<StripeScreen
			incorrectCardNum={incorrectCardNum}
			incorrectCvc={incorrectCvc}
			incorrectMonth={incorrectMonth}
			incorrectYear={incorrectYear}
			cardIcon={cardIcon}
			cardNum={cardNum}
			expMonth={expMonth}
			expYear={expYear}
			cvc={cvc}
			isLoading={isLoading}
			amount={amount}
			message={message}
			toastOpen={toastOpen}
			cardImages={cardImages}
			setToastOpen={setToastOpen}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleCardNum={handleCardNum}
			validateCvc={validateCvc}
		/>
	);
}
