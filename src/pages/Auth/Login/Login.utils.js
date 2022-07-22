import React, { useState, useContext } from "react";
import LoginView from "./Login.view";
import { useHistory } from "react-router";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import { retrieveLocal, storeLocal } from "../../../localStorage/saveLocal";

let bool;
let result = false;
export default function LoginUtils() {
	const { user, emailU } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [email, setEmail] = emailU;

	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const history = useHistory();

	React.useEffect(async () => {
		if ((await retrieveLocal("remember")) === "true") {
			history.push("/home");
		}
	}, []);
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
			const response = await fetch("https://connectedparking.ca/api/login/", {
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
				setUserId(result.result._id);
				setEmail(result.result.email);
				setMessage("Signed in successfully");
				setToastOpen(true);
				storeLocal("userId", result.result._id);
			}
		} catch (e) {
			// alert("Oops", e.message);
			setMessage("Could Not Sign In!");
			setToastOpen(true);
		}
		setLoading(false);
		if (!bool) {
			setMessage(result.msg);
			setToastOpen(true);
		} else if (result.result.forget_password) {
			history.push("/changePassword");
		} else {
			history.push("/home");
		}
	};
	return (
		<LoginView
			handleSubmit={(e) => handleSubmit(e)}
			message={message}
			setToastOpen={setToastOpen}
			toastOpen={toastOpen}
		/>
	);
}
