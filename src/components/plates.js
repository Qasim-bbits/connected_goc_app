import React from 'react';

import '../assets/styles/card.css';

// import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';



export default function plates(props) {


    return (
    <IonPage>
      <IonHeader>
        
      </IonHeader>

      <IonContent>

        <IonCard
         class='plateCard'
        
        >
          {/* <IonCardHeader>
            
            <IonCardTitle>
                
                    

            </IonCardTitle>

          </IonCardHeader> */}

          <IonCardContent>
            <IonItem  class='plateCard'>
            <IonIcon icon={props.icon} slot="start" />
            <IonLabel >{props.text}</IonLabel>
            </IonItem>
          
         </IonCardContent>

        </IonCard>


      </IonContent>
    </IonPage>
  );


    
}
      

        



