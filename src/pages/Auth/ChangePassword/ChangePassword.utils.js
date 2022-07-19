import React, { useState, useContext } from "react";
import SignupView from "./ChangePassword.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;

export default function ChangePasswordUtils() {
	const { emailU } = useContext(globalStateContext);
	const [email, setEmail] = emailU;
	const [loading, setLoading] = React.useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: email,
			password: data.get("password2"),
		});
		sendData(data);
	};

	const sendData = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/changePassword/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					new_password: data.get("password2"),
				}),
			});
			result = await response.json();
			console.log(result);
			if (!result.auth) {
				bool = false;
			} else {
				bool = true;
				alert("Password Changed!");
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
		if (!bool) {
			alert("Unsuccessful Change!");
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
		/>
	);
}
