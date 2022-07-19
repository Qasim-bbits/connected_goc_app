import React, {useContext, useState} from 'react';
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
  IonImg,
  IonLabel,
  IonThumbnail,
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

export default function PurchaseReceipt(props) {

  const {stepsData} = useContext(globalStateContext);
  const [steps, setSteps] = stepsData;


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar text-center class='ion-text-center new-background-color'>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" text=""/>
          </IonButtons>
          <IonTitle id='title' text-center>Purchase Receipt</IonTitle>
        </IonToolbar>
      </IonHeader>
          <IonContent>
          <IonCard>
            <IonItem>
              <IonText>
                Parking ID Number
              </IonText>
              <IonText slot='end'>
                #####
              </IonText>
            </IonItem>
            <IonItem>
              <IonThumbnail slot="start" style={{width: '30%', height: '30%'}}>
                <IonImg src={TimeFromCar} />
                <IonLabel style={{marginLeft: '15%'}}>
                  6:00 pm
                </IonLabel>
              </IonThumbnail>
              <IonThumbnail>
                <IonImg src={Clock}/>
              </IonThumbnail>
              <IonThumbnail slot="end" style={{width: '45%', height: '45%'}}>
                <IonImg src={TimeToCar} />
                <IonLabel style={{marginTop: '15%', marginLeft: '15%'}}>
                  6:00 pm
                </IonLabel>
              </IonThumbnail>
            </IonItem>
          </IonCard>
          <Divider sx={{width: '80%'}}/>
          <IonItem>
            <IonImg src={Location} slot='start' style={{width: '15%', height: '15%'}}/>
            <IonLabel>
              Town Centre, Canmore, Alberta
            </IonLabel>
          </IonItem>
            <IonItem>
              <IonImg src={CarWithTick} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonLabel>
                Test 1
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonImg src={Rate} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonLabel>
                Town Center Resident Rate
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonImg src={Discount} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonLabel>

              </IonLabel>
            </IonItem>
            <IonItem>
              <IonImg src={Paid} slot='start' style={{width: '15%', height: '15%'}}/>
              <IonText>
                Amount Paid
              </IonText>
              <IonText slot='end'>
                $0.00
              </IonText>
            </IonItem>
        </IonContent>
    </IonPage>
  );
}
