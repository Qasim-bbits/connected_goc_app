import { useContext, useState, useEffect } from "react";
import HistoryView from "./History.view";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import { useHistory } from "react-router";

export default function HistoryUtils() {
	const [isLoading, setIsLoading] = useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [historyData, setHistoryData] = useState([]);
	const { user } = useContext(globalStateContext);
	const [userId, setUserId] = user;
	const history = useHistory();

	const getHistory = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("http://35.192.138.41/api/getUserHistory/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
				}),
			}).then((response) => response.json());
			setHistoryData(response);
			console.log(historyData, "historyResponse");
		} catch (e) {
			setMessage("History could not be fetched");
			setToastOpen(true);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getHistory();
	}, []);

	let handleShowReceipt = (value) => {
		console.log(value);
		history.push({
			pathname: "/historyReceipt",
			state: { detail: value },
		});
	};

	return (
		<HistoryView
			//Variables
			isLoading={isLoading}
			historyData={historyData}
			message={message}
			toastOpen={toastOpen}
			//Functions
			setToastOpen={setToastOpen}
			handleShowReceipt={handleShowReceipt}
		/>
	);
}
