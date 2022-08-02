import {
	IonContent,
	IonPage,
	IonItem,
	IonImg,
	IonLabel,
	IonThumbnail,
	IonSkeletonText,
} from "@ionic/react";
import TimeFromCar from "../../../assets/icons/1.png";
import TimeToCar from "../../../assets/icons/3.png";
import Clock from "../../../assets/icons/2.png";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";
const moment = require("moment-timezone");

export default function History(props) {
	return (
		<IonPage>
			<Header title="User History" isHome={false} backLink="/home" />
			<IonContent>
				{props.isLoading ? (
					<>
						<IonSkeletonText
							animated
							style={{
								display: "flex",
								width: "90%",
								height: "80%",
								margin: "10% auto",
							}}
						/>
					</>
				) : (
					props.historyData.map((data) => {
						return (
							<IonItem onClick={() => props.handleShowReceipt(data)}>
								<IonThumbnail
									slot="start"
									style={{ width: "30%", height: "30%" }}
								>
									<IonImg src={TimeFromCar} />
									<IonLabel
										style={{ marginLeft: "5%", fontSize: "9px", width: "100%" }}
									>
										{moment(data?.from).format("MMMM Do YYYY, h:mm:ss a")}
									</IonLabel>
								</IonThumbnail>
								<IonThumbnail>
									<IonImg
										src={Clock}
										style={{ transform: "translateX(50%)" }}
									/>
								</IonThumbnail>
								<IonThumbnail
									slot="end"
									style={{ width: "45%", height: "45%" }}
								>
									<IonImg src={TimeToCar} />
									<IonLabel
										style={{ marginTop: "18%", fontSize: "9px", width: "100%" }}
									>
										{moment(data?.to).format("MMMM Do YYYY, h:mm:ss a")}
									</IonLabel>
								</IonThumbnail>
							</IonItem>
						);
					})
				)}
			</IonContent>
			<Toast
				message={props.message}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
			/>
		</IonPage>
	);
}
