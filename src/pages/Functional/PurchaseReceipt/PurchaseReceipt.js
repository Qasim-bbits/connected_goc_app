import React, {useContext, useState} from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonText,
  IonItem,
  IonImg,
  IonLabel,
  IonThumbnail, IonButton, IonSpinner,
} from '@ionic/react';
import {Divider} from "@mui/material";
import TimeFromCar from '../../../assets/icons/1.png';
import TimeToCar from '../../../assets/icons/3.png';
import Clock from '../../../assets/icons/2.png';
import Location from '../../../assets/icons/5.png';
import CarWithTick from '../../../assets/icons/6.png';
import Rate from '../../../assets/icons/7.png';
import Discount from '../../../assets/icons/8.png';
import Paid from '../../../assets/icons/9.png';
import {globalStateContext} from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";
import moment from "moment-timezone";

export default function PurchaseReceipt(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [toastColor, setToastColor] = useState('')
  const { payment, selectedRate } = useContext(globalStateContext);
  const [paymentData, setPaymentData] = payment;
  const [selectedRateData, setSelectedRateData] = selectedRate;

  let handleSendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      let res = await fetch("https://connectedparking.ca/api/emailReciept", {
        method: "POST",
        body: JSON.stringify({
          parking_id: paymentData._id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      let resJson = await res.json();
      setIsLoading(false)
      if (resJson.status === 'success') {
          setToastColor('success')
          setMessage(resJson.msg);
          setToastOpen(true)
      } else {
        setMessage("Could not send email");
        setToastOpen(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <Header
        title='Purchase Receipt'
        isHome={false}
        backLink='home'
      />
          <IonContent>
          <IonCard>
            <IonItem>
              <IonText>
                Parking ID Number
              </IonText>
              <IonText slot='end'>
                {paymentData?.parking_id}
              </IonText>
            </IonItem>
            <IonItem>
              <IonThumbnail slot="start" style={{width: '30%', height: '30%'}}>
                <IonImg src={TimeFromCar} />
                <IonLabel style={{marginLeft: '5%', fontSize: '9px', width: '100%'}}>
                  {moment(paymentData?.to).format('MMMM Do YYYY, h:mm:ss a')}
                </IonLabel>
              </IonThumbnail>
              <IonThumbnail>
                <IonImg src={Clock} style={{transform: 'translateX(50%)'}}/>
              </IonThumbnail>
              <IonThumbnail slot="end" style={{width: '45%', height: '45%'}}>
                <IonImg src={TimeToCar} />
                <IonLabel style={{marginTop: '15%', fontSize: '9px', width: '100%'}}>
                  {moment(paymentData?.to).format('MMMM Do YYYY, h:mm:ss a')}
                </IonLabel>
              </IonThumbnail>
            </IonItem>
          </IonCard>
          <Divider sx={{width: '80%'}}/>
          <IonItem>
            <IonImg src={Location} slot='start' style={{width: '15%', height: '15%'}}/>
            <IonLabel>
              Town Centre, Otawa, Canada
            </IonLabel>
          </IonItem>
            <IonItem>
              <IonImg src={CarWithTick} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonLabel>
                {paymentData.plate}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonImg src={Rate} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonLabel>
                {selectedRateData.rate_name}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonImg src={Discount} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonText>
                Service Fee
              </IonText>
              <IonText slot='end'>
                ${paymentData.service_fee/100}
              </IonText>
            </IonItem>
            <IonItem>
              <IonImg src={Paid} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonText>
                Amount Paid
              </IonText>
              <IonText slot='end'>
                ${paymentData.amount}
              </IonText>
            </IonItem>
            <IonButton
              onClick={(e) => handleSendEmail(e)}
              style={{width: '100%', marginTop: '10%', padding: '0 30% 0 30%'}}
            >
              {isLoading ? (<IonSpinner name="crescent" />) : `Send Email`}
            </IonButton>
        </IonContent>
      <Toast
        message={message}
        toastOpen={toastOpen}
        setToastOpen={setToastOpen}
        color={toastColor}
      />
    </IonPage>
  );
}
