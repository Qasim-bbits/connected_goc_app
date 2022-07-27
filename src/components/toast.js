import React from 'react';
import {IonToast} from "@ionic/react";
import './toast.css';

function Toast(props) {
  const {
    message,
    toastOpen,
    setToastOpen,
    color
  } = props;
  return (
    <div className='toast-wrapper'>
      <IonToast
        isOpen={toastOpen}
        onDidDismiss={() => setToastOpen(false)}
        message={message}
        duration={3000}
        color={color ? color : 'danger'}
        cssClass='customToast'
        position='top'
      />
    </div>
  );
}

export default Toast;