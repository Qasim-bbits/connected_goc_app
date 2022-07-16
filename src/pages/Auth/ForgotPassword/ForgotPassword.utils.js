import ForgotPassword from "./ForgotPassword.view";

export default function ForgotPasswordUtils() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
		});
	};
	return <ForgotPassword handleSubmit={(e) => handleSubmit(e)} />;
}
