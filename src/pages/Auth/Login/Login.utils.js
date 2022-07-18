import React, { useState, useContext } from "react";
import LoginView from "./Login.view";
import { useHistory } from "react-router";
import { globalStateContext } from "../../../context/GlobalStateProvider";

let bool;
let result = false;

export default function LoginUtils() {
	const { user } = useContext(globalStateContext);
	const [userId, setUserId] = user;

	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
		// if (
		// 	data.get("email") === "dev@bbits.solutions" &&
		// 	data.get("password") === "12345"
		// ) {
		// 	history.push("/home");
		// } else {
		// 	setMessage("Incorrect Password");
		// 	setToastOpen(true);
		// }
		sendData(data);
	};

	const sendData = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/login/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: data.get("email"),
					password: data.get("password"),
				}),
			});
			result = await response.json();
			console.log(result);
			if (result.auth != true) {
				bool = false;
			} else {
				bool = true;
				// alert(result.result._id);
				setUserId(result.result._id);
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
		if (!bool) {
			alert("Unsuccessful SignIn!");
		} else {
			history.push("/home");
		}
	};
	return (
		<LoginView
			handleSubmit={(e) => handleSubmit(e)}
			message={message}
			setToastOpen={setToastOpen}
			toastOpen
		/>
	);
}
