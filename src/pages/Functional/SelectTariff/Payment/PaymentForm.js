import React, {useState} from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonButton,
  IonRow
} from "@ionic/react";
import Toast from "../../../../components/toast";

function PaymentForm(props) {
  const {
    amount,
  } = props
  const [cardNum, setCardNum] = useState('')
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/mobileParking", {
        method: "POST",
        body: JSON.stringify({
          cardNum: cardNum,
          expDate: expDate,
          cvv: cvv,
          amount: amount,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Payment Successful");
        setToastOpen(true)
      } else {
        setMessage("Payment Failed. Something went wrong");
        setToastOpen(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardNum = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      setCardNum(parts.join(' '));
    } else {
      setCardNum(value);
    }
    console.log(cardNum)
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <IonRow>
          <IonCol>
          <IonInput
            inputMode='tel'
            value={cardNum}
            onIonChange={(e) => handleCardNum(e.target.value)}
            placeholder='Card Number'
            pattern="[\d| ]{16,22}"
            style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
          />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonInput
              type="text"
              value={expDate}
              onIonChange={(e) => setExpDate(e.target.value)}
              placeholder='Expiry Date'
              style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
            />
          </IonCol>
          <IonCol>
            <IonInput
              inputMode='number'
              value={cvv}
              id='cvv'
              maxlength='3'
              onIonChange={(e) => setCvv(e.target.value)}
              placeholder='CVV'
              style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <IonButton
            type="submit"
            style={{width: '100%'}}
          >
            Pay ${amount}
          </IonButton>
          </IonCol>
        </IonRow>
    </form>
      <Toast
        message={message}
        toastOpen={toastOpen}
        setToastOpen={setToastOpen}
      />
      </>
  );
}

export default PaymentForm;