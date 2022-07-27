import React from "react";
import SignupView from "./Signup.view";
import {useHistory} from "react-router";

let bool;
let result = false;

export default function SignupUtils() {
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
			if (result.status !== "success") {
				bool = false;
			} else {
				bool = true;
				setToastColor('primary')
				setMessage(result.msg);
				setToastOpen(true);
			}
		} catch (e) {
			setMessage(e.message);
			setToastOpen(true);
			setToastColor('danger')
		}
		setLoading(false);
		if (!bool) {
			setMessage(result.msg);
			setToastOpen(true);
			setToastColor('danger')
		} else {
			// history.push('/login')
		}
	};

	return (
		<SignupView
			handleSubmit={(e) => handleSubmit(e)}
			dataStatus={result.status}
			message={message}
			setToastOpen={setToastOpen}
			toastOpen={toastOpen}
			toastColor={toastColor}
			loading={loading}
		/>
	);
}
