import { useMutation } from '@apollo/client';
import {  useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,

    CardExpiryElement} from '@stripe/react-stripe-js'
    // import {} from ''
import { SecondaryButton } from 'components/Buttons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CREATE_PAYMENT_INTENT, CREATE_TRANSACTION } from 'utililites/schema';
import {DisplayError} from 'components'
import {createPaymentIntent,createPaymentIntentVariables}from 'utililites/__generated__/createPaymentIntent'
import {createTransaction,createTransactionVariables} from 'utililites/__generated__/createTransaction'
import { TopUp } from '__generated__/globalTypes';
import { getCoinValue } from 'utililites/util';
export const SplitForm = (props:any)=>{
  const [createPaymentIntent] = useMutation<createPaymentIntent,createPaymentIntentVariables>(CREATE_PAYMENT_INTENT)
  const [createTransaction] = useMutation<createTransaction, createTransactionVariables>(CREATE_TRANSACTION)
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('')
  const router = useRouter() 
  const {topup} = router.query
  const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
      createPaymentIntent({variables:{topup: topup as TopUp}}).then((intent)=>{
        setClientSecret(intent.data.createPaymentIntent)
      })
    }, [])
    useEffect(() => {
console.log('hello world',clientSecret);

    },[clientSecret])
    const onHandleSubmit = async (e:any)=>{
try {
    e.preventDefault();
    // deduct the payment of the user 
    // send the transaction history to the backend
    // create the transaction history 
    // update the users wallet
 
    // console.log(stripe,elements);
        const cardElement = elements.getElement(CardNumberElement)
        // console.log(cardElement);
    // get the payment intent
    const payload = await stripe.confirmCardPayment(clientSecret,{
   payment_method:{
        card:cardElement,
        

   }
    })
    console.log('helo',payload);
    if (payload.paymentIntent.status === 'succeeded') {
      await createTransaction({variables:{topup: topup as TopUp,transaction:{amount: payload.paymentIntent.amount,currency:payload.paymentIntent.currency,date:payload.paymentIntent.created}}})
      router.replace('/settings')
    }
    
} catch (error) {
    console.log(error);
    setMessage(error.message)
    
}
    }
    return(
        <form onSubmit={onHandleSubmit} className="grid grid-cols-1 w-full space-y-12">
          
          {message && <DisplayError message={message} setError={setMessage} />}
                <div className=" justify-self-center font-raleway w-3/4 space-y-2">
                      <label>Topup Amount :</label>
                      <p>{ getCoinValue(topup as TopUp,'USD')}</p>
                    </div>
                    <div className="justify-self-center font-raleway w-3/4 space-y-2">
        Card number
        <CardNumberElement
        //   options={options}
        className='rounded-md border p-2'
          onReady={() => {
            // console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            // console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            // console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            // console.log("CardNumberElement [focus]");
          }}
        />
      </div>
      <div className="justify-self-center font-raleway w-3/4 space-y-2">
        Expiration date
        <CardExpiryElement
        //   options={options}
        className='rounded-md border p-2'
          onReady={() => {
            // console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            // console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            // console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            // console.log("CardNumberElement [focus]");
          }}
        />
      </div>
      <div className="justify-self-center font-raleway w-3/4 space-y-2">
        CVC
        <CardCvcElement
        //   options={options}
        className='rounded-md border p-2'
          onReady={() => {
            // console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            // console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            // console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            // console.log("CardNumberElement [focus]");
          }}
        />
      </div>
      <div className="justify-self-center font-raleway text-center w-1/4">

<SecondaryButton  onClick={() => {}} label="Top up" />
</div>
        </form>
    )
}