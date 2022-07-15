import {IonButton, IonLabel} from '@ionic/react';
import { useEffect } from 'react';
/**
 * If you use typescript@4.5, you can write:
 * import { useCapacitorStripe } from '@capacitor-community/stripe/react';
 */
import { useCapacitorStripe } from '@capacitor-community/stripe/dist/esm/react/provider';
import { usePaymentSheet } from '../../../../components/payment-sheet';
import React from 'react';
import {PaymentSheetEventsEnum} from "@capacitor-community/stripe";

export const PaymentSheet = (props) => {
    const { stripe } = useCapacitorStripe()
    const { createPaymentIntent } = usePaymentSheet()

    useEffect(() => {
        stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
            console.log('PaymentSheetEventsEnum.Completed');
        });
    }, [])

    return (
            <IonButton
              style={{width: '80%'}}
                onClick={async e => {
                    e.preventDefault()
                    const {
                        customer,
                        paymentIntent,
                        ephemeralKey,
                    } = await createPaymentIntent()
                    try {
                        await stripe.createPaymentSheet({
                            paymentIntentClientSecret: paymentIntent,
                            customerId: customer,
                            customerEphemeralKeySecret: ephemeralKey,
                            merchantDisplayName: 'rdlabo',
                        }).then(()=>{
                            try {
                                stripe.presentPaymentSheet().then(
                                    (res) => {
                                        console.log(res)
                                    }
                                )
                              console.log(
                                customer,
                                paymentIntent,
                                ephemeralKey,
                              )
                            } catch(e) {
                                console.log(e)
                            }
                        })
                    } catch(e) {
                        console.log(e)
                    }
                }}
            >
                <IonLabel>Pay ${props.amount}</IonLabel>
            </IonButton>
    );
};