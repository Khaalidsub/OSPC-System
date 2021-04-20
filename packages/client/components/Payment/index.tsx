import {  useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,

    CardExpiryElement} from '@stripe/react-stripe-js'
    // import {} from ''
import { SecondaryButton } from 'components/Buttons';
import React from 'react';
export const SplitForm = (props:any)=>{
    const stripe = useStripe();
    const elements = useElements();
    const onHandleSubmit = async (e:any)=>{
try {
    e.preventDefault();
    // deduct the payment of the user 
    // send the transaction history to the backend
    // create the transaction history 
    // update the users wallet
    const {} = props;
    // console.log(stripe,elements);
        const cardElement = elements.getElement(CardNumberElement)
        // console.log(cardElement);
    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card:cardElement,
        
    })
    console.log(paymentMethod);
    
} catch (error) {
    console.log(error);
    
}
    }
    return(
        <form onSubmit={onHandleSubmit} className="grid grid-cols-1 w-full space-y-12">
                    <div className="justify-self-center font-raleway w-3/4 space-y-2">
        Card number
        <CardNumberElement
        //   options={options}
        className='rounded-md border p-2'
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </div>
      <div className="justify-self-center font-raleway w-3/4 space-y-2">
        Expiration date
        <CardExpiryElement
        //   options={options}
        className='rounded-md border p-2'
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </div>
      <div className="justify-self-center font-raleway w-3/4 space-y-2">
        CVC
        <CardCvcElement
        //   options={options}
        className='rounded-md border p-2'
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </div>
      <div className="justify-self-center font-raleway text-center w-1/4">

<SecondaryButton  onClick={() => {}} label="Top up" />
</div>
        </form>
    )
}