import React, { useContext, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import "../../../assets/styles/SelectTariff.css";
import {
	IonBackButton,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonPage,
	IonCard,
	IonText,
	IonItem,
	IonSkeletonText,
} from "@ionic/react";
import { Divider } from "@mui/material";
import PaymentForm from "./Payment/PaymentForm";
import { globalStateContext } from "../../../context/GlobalStateProvider";
let moment = require('moment-timezone');

export default function SelectTariff(props) {
	const [step, setStep] = useState(0)
	const [stepData, setStepData] = useState(null)

	const {user, city, zone, plateName, currCoord} = useContext(globalStateContext);
	const [plate, setPlate] = plateName;
	const [userId, setUserId] = user;
	const [cityId, setCityId] = city;
	const [zoneId, setZoneId] = zone;
	const [coord, setCoord] = currCoord;

	React.useEffect(() => {
		let isMounted = true;
		props.fetchSteps().then((data) => {
			if (isMounted) setStepData(data);
		});
		console.log(stepData, "step Data");
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar text-center class='ion-text-center new-background-color'>
					<IonButtons slot="start">
						<IonBackButton defaultHref="home" text=""/>
					</IonButtons>
					<IonTitle id='title' text-center>Select Tariff</IonTitle>
				</IonToolbar>
			</IonHeader>
			{props.parkingUnavailable ?
				<IonContent style={{display: 'flex'}}>
					<IonItem>
						<IonText>
							{props.message}
						</IonText>
					</IonItem>
				</IonContent>
				: (stepData?.length ?
						(<IonContent>
							<IonCard>
								<IonItem>
									<IonText>
										{moment().tz('Canada/Eastern').format("MMM Do YYYY, hh:mm a")}
									</IonText>
								</IonItem>
								<IonItem>
									<IonText variant='caption' align='left' style={{color: 'primary.main'}}>
										Your parking session will end:
									</IonText>
									<IonText
										slot='end'
										style={{background: '#161b40', color: 'aliceblue', padding: '0 23px', borderRadius: '17px'}}
									>
										{stepData?.[step]?.day}
									</IonText>
								</IonItem>
								<IonItem>
									<IonText style={{color: '#fff'}}>
										{moment(stepData?.[step]?.time_desc, "MMMM Do YYYY, hh:mm a").format("MMM Do YYYY")}
									</IonText>
									<IonText style={{color: '#fff', fontSize: '30px'}} slot='end'>
										{moment(stepData?.[step]?.time_desc, "MMM Do YYYY, hh:mm a").format("hh:mm a")}
									</IonText>
								</IonItem>
							</IonCard>
							<Divider sx={{width: '80%'}}/>
							<div className='tax-info'>
								<IonText style={{color: 'primary.main'}}>
									Total (incl. 5% GST):
								</IonText>
								<IonText style={{color: 'primary.main'}}>
									CA${(stepData?.[step]?.rate / 100).toFixed(2)}
								</IonText>
							</div>
							<IonContent>
								<div className='rate-cycle-text'>
									<IonText align='center'>
										<h5>
											{stepData?.[step]?.time_diff}
										</h5>
									</IonText>
									<IonText align='center'>
										<h5>
											CA${(stepData?.[step]?.rate / 100).toFixed(2)}
										</h5>
									</IonText>
								</div>
								<div className='rate-cycle'>
									<CircleSlider
										value={step}
										min={0}
										max={stepData?.length - 1}
										onChange={(e) => setStep(e)}
										size={280}
									/>
								</div>
								<div className='payment-button'>
									<PaymentForm
										amount={stepData?.[step]?.rate / 100}
										user={userId}
										city={cityId}
										zone={zoneId}
										currentCoordinates={coord}
										plate={plate}
										to={stepData?.[step]?.time_desc}
										from={stepData?.[step]?.current_time}
									/>
								</div>
							</IonContent>
						</IonContent>) :
						<IonSkeletonText animated style={{width: '60%'}}/>
				)}
		</IonPage>
	);
}