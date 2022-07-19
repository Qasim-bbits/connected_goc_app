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
  IonItem, IonImg,
} from '@ionic/react';
import {Divider} from "@mui/material";
import moment from "moment";
import TimeFromCar from '../../../assets/icons/1.png';
import TimeToCar from '../../../assets/icons/3.png';

export default function PurchaseReceipt(props) {

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
              <IonImg src={TimeFromCar} slot='start' style={{width: '30%', height: '30%'}}/>
              <IonImg src={TimeToCar} slot='end' style={{width: '70%', height: '70%'}}/>
            </IonItem>
            <IonItem>
              <IonText style={{color: '#fff'}}>
                {/*{moment(stepData?.[step]?.time_desc, "MMMM Do YYYY, hh:mm a").format("MMM Do YYYY")}*/}
              </IonText>
              <IonText style={{color: '#fff', fontSize: '30px'}} slot='end'>
                {/*{moment(stepData?.[step]?.time_desc, "MMM Do YYYY, hh:mm a").format("hh:mm a")}*/}
              </IonText>
            </IonItem>
          </IonCard>
          <Divider sx={{width: '80%'}}/>
          <div className='tax-info'>
            <IonText style={{color: 'primary.main'}}>
              Total (incl. 5% GST):
            </IonText>
            <IonText style={{color: 'primary.main'}}>
              {/*CA${(stepData?.[step]?.rate / 100).toFixed(2)}*/}
            </IonText>
          </div>
        </IonContent>
    </IonPage>
  );
}
