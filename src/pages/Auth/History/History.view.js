import React, {useContext, useState, useEffect} from 'react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonImg,
  IonLabel,
  IonThumbnail,
  IonSkeletonText,
} from '@ionic/react';
import TimeFromCar from '../../../assets/icons/1.png';
import TimeToCar from '../../../assets/icons/3.png';
import Clock from '../../../assets/icons/2.png';
import {globalStateContext} from "../../../context/GlobalStateProvider";
import Header from "../../../Common/header";
import Toast from "../../../components/toast";
import {useHistory} from "react-router";
const moment = require('moment-timezone');

export default function History(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [historyData, setHistoryData] = useState([])
  const { user } = useContext(globalStateContext);
  const [userId, setUserId] = user;
  const history = useHistory();

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://connectedparking.ca/api/getUserHistory/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }).then((response) => response.json());
      setHistoryData(response);
    } catch (e) {
      setMessage("History could not be fetched");
      setToastOpen(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getHistory();
  }, [])

  let handleShowReceipt = (value) => {
    history.push({
      pathname: '/historyReceipt',
      state: { detail: value }
    })
  };

  return (
    <IonPage>
      <Header
        title='User History'
        isHome={false}
        backLink='/home'
      />
      <IonContent>
        {isLoading ? <><IonSkeletonText animated style={{display: 'flex', width: '90%', height: '80%', margin: '10% auto'}}/></> : (
          historyData.map((data) => {
            return (
              <IonItem
                onClick={()=>handleShowReceipt(data)}
                style={{margin: '5%', borderRadius: '20px', boxShadow: '2px 4px rgba(0, 0, 0, 0.2)'}}
                className='receipt-item'
                lines='none'
                color='light'
              >
                <IonThumbnail slot="start" style={{width: '30%', height: '30%'}}>
                  <IonImg src={TimeFromCar} />
                  <IonLabel style={{marginLeft: '5%', fontSize: '9px', width: '100%'}}>
                    {moment(data?.from).format('MMMM Do YYYY, h:mm a')}
                  </IonLabel>
                </IonThumbnail>
                <IonThumbnail>
                  <IonImg src={Clock} style={{transform: 'translateX(50%)'}}/>
                </IonThumbnail>
                <IonThumbnail slot="end" style={{width: '45%', height: '45%'}}>
                  <IonImg src={TimeToCar} />
                  <IonLabel style={{marginTop: '18%', fontSize: '9px', width: '100%'}}>
                    {moment(data?.to).format('MMMM Do YYYY, h:mm a')}
                  </IonLabel>
                </IonThumbnail>
              </IonItem>
            )
          })
        )}
      </IonContent>
      <Toast
        message={message}
        toastOpen={toastOpen}
        setToastOpen={setToastOpen}
      />
    </IonPage>
  );
}
