import React, {useState} from 'react';
import { CircleSlider } from "react-circle-slider";
import moment from 'moment';
import './SelectTariff.css';
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
} from '@ionic/react';
import {Divider} from "@mui/material";
import PaymentForm from "./Payment/PaymentForm";

const cycleData = [
  {
    time: 720,
    rate: 500,
    time_desc: "July 8th 2022, 05:00 am",
    time_diff: "9h 48m ",
    day: "Tomorrow"
  },
  {
    time: 60,
    rate: 600,
    time_desc: "July 8th 2022, 06:00 am",
    time_diff: "10h 48m ",
    day: "Tomorrow"
  },
  {
    time: 120,
    rate: 700,
    time_desc: "July 8th 2022, 07:00 am",
    time_diff: "11h 48m ",
    day: "Tomorrow"
  }
]

export default function SelectTariff(props) {

  const [step, setStep] = useState(0)

  const handleOnChange = (value) => {
    setStep(value);
    console.log(value)
  }

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
      <IonContent>
        <IonCard>
        <IonItem>
          <IonText>
            {moment().format("MMM Do YYYY, hh:mm a")}
          </IonText>
        </IonItem>
          <IonItem>
            <IonText variant='caption' align='left' style={{color: 'primary.main'}} >
              Your parking session will end:
            </IonText>
          <IonText
            slot='end'
            style={{background: '#161b40', color: 'aliceblue', padding: '0 23px', borderRadius: '17px'}}
          >
            {/*{props.rateCycle[props.steps].day}*/}
            {cycleData[step].day}
          </IonText>
          </IonItem>
          <IonItem>
          <IonText style={{color: '#fff'}} >
            {/*{moment(props.rateCycle[props.steps].time_desc, "MMMM Do YYYY, hh:mm a").format("MMM Do YYYY")}*/}
            {moment(cycleData[step].time_desc, "MMMM Do YYYY, hh:mm a").format("MMM Do YYYY")}
          </IonText>
          <IonText style={{color: '#fff', fontSize:'30px'}} slot='end'>
            {/*{moment(props.rateCycle[props.steps].time_desc, "MMM Do YYYY, hh:mm a").format("hh:mm a")}*/}
            {moment(cycleData[step].time_desc, "MMM Do YYYY, hh:mm a").format("hh:mm a")}
          </IonText>
        </IonItem>
      </IonCard>
        <Divider sx={{width: '80%'}}/>
        <div className='tax-info'>
          <IonText style={{color: 'primary.main'}} >
            Total (incl. 5% GST):
          </IonText>
          <IonText style={{color: 'primary.main'}} >
            CA${(cycleData[step].rate/100).toFixed(2)}
          </IonText>
        </div>
        <IonContent>
          <div className='rate-cycle-text'>
            <IonText align='center'>
              {/*{props.rateCycle[props.steps].time_diff}*/}
             <h5>
               {cycleData[step].time_diff}
             </h5>
            </IonText>
            <IonText align='center'>
              {/*CA${(props.rateCycle[props.steps].rate/100).toFixed(2)}*/}
              <h5>
                CA${(cycleData[step].rate/100).toFixed(2)}
              </h5>
            </IonText>
          </div>
          <div className='rate-cycle'>
          <CircleSlider
            value={step}
            min={0}
            max={cycleData.length-1}
            // max={props.rateCycle.length-1}
            onChange={(e) => handleOnChange(e)}
            size={280}
          />
          </div>
          <div className='payment-button'>
            {/*{isApplePayAvailable ?? <ApplePay/>}*/}
            {/*{isGooglePayAvailable ?? <GooglePay/>}*/}
            <PaymentForm amount={cycleData[step].rate/100}/>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
}
