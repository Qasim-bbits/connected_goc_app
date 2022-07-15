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

function PaymentForm(props) {
  const [cardNum, setCardNum] = useState(null)
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState(null);
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/mobileParking", {
        method: "POST",
        body: JSON.stringify({
          cardNum: cardNum,
          expDate: expDate,
          cvv: cvv,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
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
    <form onSubmit={handleSubmit}>
      <IonGrid>
        <IonRow>
          <IonInput
            inputMode='tel'
            value={cardNum}
            onChange={(e) => handleCardNum(e.target.value)}
            placeholder='Card Number'
            pattern="[\d| ]{16,22}"
            format
            style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
          />
        </IonRow>
        <IonRow>
          <IonCol>
            <IonInput
              type="text"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              placeholder='Expiry Date'
              style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
            />
          </IonCol>
          <IonCol>
            <IonInput
              inputMode='numeric'
              value={cvv}
              id='cvv'
              onChange={(e) => setCvv(e.target.value)}
              placeholder='CVV'
              style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonButton
            type="submit"
            style={{width: '100%'}}
          >
            Pay
          </IonButton>
        </IonRow>
      </IonGrid>
    </form>
  );
}

export default PaymentForm;