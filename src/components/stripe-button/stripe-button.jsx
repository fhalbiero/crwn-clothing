import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const pubishableKey = 'pk_test_Ej88c0ooWMaVMeDGxAEqOb7x00ftwcHyRm';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesfull');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={pubishableKey}
        />
    )
}

export default StripeCheckoutButton;