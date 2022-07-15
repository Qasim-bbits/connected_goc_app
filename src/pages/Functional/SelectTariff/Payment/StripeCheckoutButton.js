import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51KFDksKRG9PRcrzzFTufGURQI0o6bpWmfKE2j38nn0bTHIrLDq0nWyD4j6Y6weguOBJL4y5qrmPJCWzGKioy4uOX00icJMyhaP";

  const onToken = token => {
    console.log(token);
  };

  return (
    <StripeCheckout
      label='Pay with Card'
      name='Connected GOC'
      billingAddress={false}
      email={false}
      shippingAddress={false}
      ComponentClass="div"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay with Card'
      token={onToken}
      currency="USD"
      stripeKey={publishableKey}
    >
      <button
        style={{
          display:'flex',
          width:'80vw',
          height: '40px',
          backgroundColor: '#0f938f',
          borderRadius: '20px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        Pay With Card
      </button>
    </StripeCheckout>
  )
}

export default StripeCheckoutButton;