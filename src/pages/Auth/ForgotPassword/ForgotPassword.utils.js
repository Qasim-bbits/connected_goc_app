import React, {useState} from "react";
import ForgotPassword from "./ForgotPassword.view";
import {useHistory} from "react-router";

let bool;
let result = false;
export default function ForgotPasswordUtils() {
	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [toastColor, setToastColor] = useState('');

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
			const response = await fetch("https://connectedparking.ca/api/forgetPassword/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: data.get("email"),
				}),
			});
			result = await response.json();
			if (result.status !== "success") {
				bool = false;
			} else {
				bool = true;
				setToastColor('primary')
				setMessage(result.msg);
				setToastOpen(true);
			}
		} catch (e) {
			setMessage('Action failed');
			setToastOpen(true);
		}
		setLoading(false);
		if (!bool && !result.exist) {
			setMessage(result.msg);
			setToastOpen(true);
		} else if (!bool) {
			setMessage('Password reset unsuccessful');
			setToastOpen(true);
		} else {
			//nothing
		}
	};
	return (
		<ForgotPassword
			handleSubmit={(e) => handleSubmit(e)}
			message={message}
			setToastOpen={setToastOpen}
			toastOpen={toastOpen}
			toastColor={toastColor}
		/>
	);
}
