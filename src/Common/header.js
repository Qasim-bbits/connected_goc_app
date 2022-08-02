import {
	IonButtons,
	IonHeader,
	IonMenuButton,
	IonTitle,
	IonToolbar,
	IonBackButton,
} from "@ionic/react";

function Header(props) {
	const { title, isHome, backLink } = props;
	return (
		<IonHeader>
			<IonToolbar text-center color="primary">
				{isHome ? (
					<IonButtons slot="end">
						<IonMenuButton />
					</IonButtons>
				) : (
					<IonButtons slot="start">
						<IonBackButton defaultHref={backLink} text="" />
					</IonButtons>
				)}
				<IonTitle id="title">{title}</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
}

export default Header;
