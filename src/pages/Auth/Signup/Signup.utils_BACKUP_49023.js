import React from "react";
import SignupView from "./Signup.view";

let bool;
let result = false;

export default function SignupUtils() {
	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
		sendData(data);
	};

	const sendData = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("https://connectedparking.ca/api/signup/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fname: data.get("fName"),
					lname: data.get("lName"),
					email: data.get("email"),
					password: data.get("password"),
					address: data.get("address"),
<<<<<<< HEAD
					ph_no: data.get("mobileNo"),
=======
					ph_no: data.get("number"),
>>>>>>> c4bea0d66dca2da9f33390384c432e550b635e6d
					language: "en",
					role: "user",
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.status != "success") {
				bool = false;
			} else {
				bool = true;
				setMessage(result.msg);
				setToastOpen(true);
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true);
		}
		setLoading(false);
		if (!bool) {
			setMessage("Unsuccessful Signup!");
			setToastOpen(true);
		} else {
			// TODO:navigate to home
			// navigation.navigate("Sync Screen", {
			// 	token: t,
			// });
		}
	};

	return (
		<SignupView
			handleSubmit={(e) => handleSubmit(e)}
			dataStatus={result.status}
			message={message}
<<<<<<< HEAD
			setToastOpen={setToastOpen}
			toastOpen={toastOpen}
=======
			toastOpen={toastOpen}
			setToastOpen={setToastOpen}
>>>>>>> c4bea0d66dca2da9f33390384c432e550b635e6d
		/>
	);
}
