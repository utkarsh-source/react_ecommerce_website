import React from 'react'
import styled, {css} from 'styled-components'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Bill from './Bill';
import {useSelector, useDispatch} from 'react-redux'
import { fullfillOrder, refreshCart } from '../redux/actionCreater'


const Hr = styled.hr`
    margin: 1rem 0px;
    height: 0.2rem;
    background-color: #5a5a5a;
    border: none;
`;

const BtnBox = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    margin-top: 2rem;
`;

const sharedBtnstyle = css`
    padding: 1rem 3rem;
    color: white;
    border-radius: 0.2rem;
    border: none;
    transition: transform 0.3s;
    cursor: pointer;
    &:active{
        transform: scale(1.02)
    }

`
const Goback = styled.button`
    ${sharedBtnstyle}
    background-color: #5a5a5a;
`

const Next = styled.button`
    ${sharedBtnstyle}
    background-color: #c4005b;
`;

const PaymentTitle = styled.p`
    font-size: 2rem;
    color:#333333;
    font-weight: bold;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    width: 100%;
`;

const cardstyle = {
    base: {
        color: 'red'
    }
}

function PaymentForm({back, next}) {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const { token } = useSelector(state => state.token);
    const { formData } = useSelector(state => state.form);
    const dispatch = useDispatch()

    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault();
        if (!stripe || !elements) return
        
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        if (error) {
            console.log(error)
        } else {
            const orderData = {
                line_items: token.live.line_items,
                customer: {
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                },
                shipping: {
                    name: 'Primary',
                    street: formData.address,
                    town_city: formData.city,
                    country_state: formData.subdivision,
                    postal_zip_code: formData.zip,
                    country: formData.country,
                },
                fulfillment : {shipping_method: formData.option},
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id : paymentMethod.id,
                    }
                }
            }
            next()
            dispatch(fullfillOrder(token.id, orderData))
            dispatch(refreshCart())
        }
    }
    
    return (
        <>  
            <Bill />
            <Hr />
            <Elements stripe={stripePromise}>
                <ElementsConsumer css={{ border: 'red' }}>
                    {({ elements, stripe }) => (
                        <Form onSubmit={(e)=>handleSubmit(e,elements, stripe)}>
                            <PaymentTitle>Payment Method</PaymentTitle>
                            <CardElement style={cardstyle}/>
                            <BtnBox>
                                <Goback onClick={()=>back()}>Go back</Goback>
                                <Next type="submit" disabled={!stripe}>Pay &nbsp; {token.live.subtotal.formatted_with_symbol}</Next>
                            </BtnBox>
                        </Form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
