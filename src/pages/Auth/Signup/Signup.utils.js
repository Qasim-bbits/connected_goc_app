import SignupView from "./Signup.view";

export default function SignupUtils() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	return <SignupView handleSubmit={(e) => handleSubmit(e)} />;
}
