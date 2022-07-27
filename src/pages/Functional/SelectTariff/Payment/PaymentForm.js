import React, {useContext, useState} from 'react';
import {
  IonCol,
  IonInput,
  IonButton,
  IonRow,
  IonSpinner,
} from "@ionic/react";
import Toast from "../../../../components/toast";
import {useHistory} from "react-router";
import {globalStateContext} from "../../../../context/GlobalStateProvider";

function PaymentForm(props) {
  const {
    amount,
    user,
    city,
    zone,
    currentCoordinates,
    plate,
    from,
    to,
    serviceFee,
  } = props
  const [cardNum, setCardNum] = useState('')
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastColor, setToastColor] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const {payment, selectedRate} = useContext(globalStateContext);
  const [paymentData, setPaymentData] = payment;
  const [selectedRateData, setSelectedRateData] = selectedRate;
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory();

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      let res = await fetch("https://connectedparking.ca/api/mobileParking", {
        method: "POST",
        body: JSON.stringify({
          cardNum: cardNum,
          expMonth: expMonth,
          expYear: expYear,
          cvv: cvv,
          amount: amount.toString(),
          service_fee: serviceFee,
          user: user,
          city: city,
          zone: zone,
          rate: selectedRateData._id,
          coord: currentCoordinates,
          plate: plate,
          from: from,
          to: to,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      let resJson = await res.json();
      setPaymentData(resJson)
      setIsLoading(false)
      if (res.status === 200) {
        if(resJson.amount && resJson.paymentMethod){
          setToastColor('success')
          setMessage("Payment Successful");
          setToastOpen(true)
          history.push('/purchaseReceipt')
        } else {
          setIsLoading(false);
          setMessage(resJson.message);
          setToastOpen(true)
        }
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
  }
  return (
    <>
      { isFormVisible ?
        (<>
          <form onSubmit={handleSubmit}>
            <IonRow>
              <IonCol style={{padding: '0 10px 0 10px'}}>
                <IonInput
                  inputMode='tel'
                  value={cardNum}
                  onIonChange={(e) => handleCardNum(e.target.value)}
                  placeholder='Card Number'
                  pattern="[\d| ]{16,22}"
                  maxlength={19}
                  style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
                />
              </IonCol>
            </IonRow>
            <IonRow style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
              <IonCol size={3}>
                <IonInput
                  type="text"
                  value={expMonth}
                  onIonChange={(e) => setExpMonth(e.target.value)}
                  placeholder='MM'
                  maxlength={2}
                  minlength={2}
                  style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
                />
              </IonCol>
              /
              <IonCol size={3}>
                <IonInput
                  type="text"
                  value={expYear}
                  onIonChange={(e) => setExpYear(e.target.value)}
                  placeholder='YY'
                  maxlength={2}
                  minlength={2}
                  style={{backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px', color: 'black'}}
                />
              </IonCol>
              <IonCol size={5}>
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
                  style={{width: '100%', marginTop: '10%'}}
                >
                  {isLoading ? (<IonSpinner name="crescent" />) : `Pay $${amount}`}
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        <Toast
        message={message}
        toastOpen={toastOpen}
        setToastOpen={setToastOpen}
        color={toastColor}
        />
        </>) :
        (
          <IonButton
            onClick={() => setIsFormVisible(true)}
            style={{width: '80%', marginTop: '10%'}}
          >
            Pay ${amount}
          </IonButton>
        )
      }
      </>
  );
}

export default PaymentForm;