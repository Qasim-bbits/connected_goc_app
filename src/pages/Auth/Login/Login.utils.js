import {useState} from "react";
import LoginView from "./Login.view";
import {useHistory} from "react-router";

export default function LoginUtils() {
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState('')
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
			if(data.get("email") === 'dev@bbits.solutions' && data.get("password") === '12345'){
				history.push('/home');
			}else {
				setMessage("Incorrect Password")
				setToastOpen(true)
			}
	};
	return <LoginView
		handleSubmit={(e) => handleSubmit(e)}
		message={message}
		setToastOpen={setToastOpen}
		toastOpen
	/>;
}
