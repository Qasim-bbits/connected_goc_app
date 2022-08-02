import { IonToast } from "@ionic/react";

function Toast(props) {
	const { message, toastOpen, setToastOpen } = props;
	return (
		<>
			<IonToast
				isOpen={toastOpen}
				onDidDismiss={() => setToastOpen(false)}
				message={message}
				duration={1000}
			/>
		</>
	);
}

export default Toast;
