import React, { useState, useContext } from "react";
import SignupView from "./ChangePassword.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import {useHistory} from "react-router";
import ChangePasswordView from "./ChangePassword.view";

let bool;
let result = false;

export default function ChangePasswordUtils() {
	const { emailU } = useContext(globalStateContext);
	const [email, setEmail] = emailU;
	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [toastColor, setToastColor] = React.useState("");
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		sendData(data);
	};

	const sendData = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("https://connectedparking.ca/api/changePassword/", {
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
			if (result.auth !== true) {
				bool = false;
			} else {
				bool = true;
				setToastColor('primary')
				setMessage("Password changed successfully");
				setToastOpen(true);
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true);
			setToastColor('danger')
		}
		setLoading(false);
		if (!bool) {
			setMessage("Could not change password");
			setToastOpen(true);
			setToastColor('danger')
		} else {
			// history.push('/login')
		}
	};

	return (
		<ChangePasswordView
			handleSubmit={(e) => handleSubmit(e)}
			dataStatus={result.status}
			message={message}
			toastOpen={toastOpen}
			setToastOpen={setToastOpen}
			toastColor={toastColor}
		/>
	);
}
