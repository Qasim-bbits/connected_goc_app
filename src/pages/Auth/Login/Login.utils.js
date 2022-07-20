import React, { useState, useContext } from "react";
import LoginView from "./Login.view";
import { useHistory } from "react-router";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import {
	storeLocal,
	retrieveLocal,
	deleteLocal,
} from "../../../localStorage/saveLocal";

let bool;
let result = false;
// let localEmail;
// let localPassword;
export default function LoginUtils() {
	const { user, emailU, passwordU, rememberMe } =
		useContext(globalStateContext);
	const [userId, setUserId] = user;
	const [email, setEmail] = emailU;
	const [password, setPassword] = passwordU;
	const [remember, setRemember] = rememberMe;

	const [loading, setLoading] = React.useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const history = useHistory();

	React.useEffect(async () => {
		if (remember || (await retrieveLocal("remember"))) {
			// storeLocal("remember", "true");
			history.push("/home");
		}

		// storeLocal("email", "qasim@bbits.solutions");
		// storeLocal("password", "12345");

		// localEmail = await retrieveLocal("email");
		// console.log("localEmail type:", typeof localEmail);
		// console.log("localEmail", localEmail);

		// localPassword = await retrieveLocal("password");
		// console.log("localPassword type:", typeof localPassword);
		// console.log("localPassword", localPassword);
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
				setEmail(result.result.email);
				setPassword(data.get("password"));
			}
		} catch (e) {
			alert("Oops", e.message);
		}
		setLoading(false);
		if (!bool) {
			alert(result.msg);
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
			toastOpen
		/>
	);
}
