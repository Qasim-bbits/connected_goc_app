import React from "react";
import ForgotPassword from "./ForgotPassword.view";

let bool;
let result = false;
export default function ForgotPasswordUtils() {
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
		});

		sendData(data);
	};
	const sendData = async (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/forgetPassword/", {
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
		if (!bool && !result.exist) {
			alert(result.msg);
		} else if (!bool) {
			alert("Password Reset Unsuccessful!");
		} else {
			// history.push("/home");
		}
	};
	return <ForgotPassword handleSubmit={(e) => handleSubmit(e)} />;
}
