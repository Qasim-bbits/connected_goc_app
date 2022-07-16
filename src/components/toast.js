import React from 'react';
import {IonToast} from "@ionic/react";

function Toast(props) {
  const {
    message,
    toastOpen,
    setToastOpen,
  } = props;
  return (
    <>
      <IonToast
        isOpen={toastOpen}
        onDidDismiss={() => setToastOpen(false)}
        message={message}
        duration={200}
      />
    </>
  );
}

export default Toast;