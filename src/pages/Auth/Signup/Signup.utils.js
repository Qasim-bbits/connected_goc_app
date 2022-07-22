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
					ph_no: data.get("mobileNo"),
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
				// alert(result.msg);
				setMessage(result.msg);
				setToastOpen(true);
			}
		} catch (e) {
			// alert("Oops", e.message);
			setMessage(e.message);
			setToastOpen(true);
		}
		setLoading(false);
		if (!bool) {
			// alert("Unsuccessful Signup!");
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
			setToastOpen={setToastOpen}
			toastOpen={toastOpen}
		/>
	);
}
