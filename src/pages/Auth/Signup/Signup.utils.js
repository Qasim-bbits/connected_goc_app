import React from "react";
import SignupView from "./Signup.view";

let bool;
let result = false;

export default function SignupUtils() {
	const [loading, setLoading] = React.useState(false);
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
			const response = await fetch("http://35.192.138.41/api/signup/", {
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
					address: "Canada",
					ph_no: "1233123",
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
				alert(result.msg);
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
		if (!bool) {
			alert("Unsuccessful Signup!");
		} else {
			// TODO:navigate to home
			// navigation.navigate("Sync Screen", {
			// 	token: t,
			// });
		}
	};

	return (
		<SignupView
			//Variables
			dataStatus={result.status}
			//Functions
			handleSubmit={(e) => handleSubmit(e)}
		/>
	);
}
