import { useState } from "react";
import HistoryReceipt from "./HistoryReceipt.view";

export default function HistoryUtils(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");

	const { detail } = props.location.state;

	let handleSendEmail = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			let res = await fetch("http://35.192.138.41/api/emailReciept", {
				method: "POST",
				body: JSON.stringify({
					parking_id: detail._id,
				}),
				headers: { "Content-Type": "application/json" },
			});
			let resJson = await res.json();
			setIsLoading(false);
			if (res.status === 200) {
				if (resJson.msg) {
					setMessage(resJson.msg);
					setToastOpen(true);
				} else {
					setMessage("Email successfully sent");
					setToastOpen(true);
				}
			} else {
				setMessage("Could not send email");
				setToastOpen(true);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<HistoryReceipt
			//Variables
			detail={detail}
			isLoading={isLoading}
			message={message}
			toastOpen={toastOpen}
			//Functions
			handleSendEmail={handleSendEmail}
			setToastOpen={setToastOpen}
		/>
	);
}
