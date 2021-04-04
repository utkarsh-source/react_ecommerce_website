import React, { useEffect, useRef, useState } from 'react' 
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'
import AddressForm from './AddressForm'
import {useDispatch, useSelector} from 'react-redux'
import { fetchToken } from '../redux/actionCreater'
import { ScaleLoader } from 'react-spinners'
import PaymentForm from './PaymentForm'
import {Link} from 'react-router-dom'

export const Wrapper = styled.section`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a8ff78;
    background: -webkit-linear-gradient(to right, #78ffd6, #a8ff78);  
    background: linear-gradient(to right, #78ffd6, #a8ff78);
    overflow-y: scroll;
    padding: 3rem 0px;
`

const ProgessBar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 0.2rem;
    width: 100%;
    justify-content: space-between;
    background-image: linear-gradient(to right, red 0%, gray 1%);
    margin-bottom: 3rem;
    & >.box{
        position: relative;
        display: flex;
        align-items: center;
        @media screen and (max-width: 768px){
            flex-direction: column;
        }
    }
`;

const Ball = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #ffffff;
    display: grid;
    place-items: center;
    font-size: 1.3rem;
    font-weight: bolder;
    color: black;
    border: 0.4rem solid red;
`;


const Container = styled.div`
    position: relative;
    width: 60%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 3rem;
    border-radius: 0.4rem;
    background-color: white;
    @media screen and (max-width: 768px){
        &{
            width: 40rem;
        }
    }
`;

const Span = styled.span`
    position: absolute;
    font-size: 1.5rem;
    color: #616161;
    font-weight: bolder;
    width: max-content;
    left: 50%;
    top: -80%;
    transform: translateX(-50%);
    @media screen and (max-width: 300px){
        font-size: 1rem;
    }
`;
const Confirm = styled.div`
        padding: 2rem;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        & > P{
            color: #009900;
            font-size: 3rem;
        }
        & > span{
            color: #da5000;
            font-size: 2rem;
            margin: 2rem 0px;
        }
        /* align-items: center; */
`;

const StyledLink = styled(Link)`
    color: blue;
    font-size: 1.5rem;
    text-decoration: underline;
    text-underline-offset: 0.5rem;
`;


function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const {cart} = useSelector(state=> state.cart)
    const bar = useRef(null)
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.token)
    const {loading : OrderLoading} = useSelector(state => state.order)
    
    const next = () => {
        setActiveStep(prev=> prev===100? 100 : prev + 50)
    }
    const back = () => {
        setActiveStep(prev=> prev===0? 0 : prev - 50)
    }

    

    const FormComponent = () => {
        switch (activeStep) {
            case 0: return <AddressForm next={next}/>
            case 50: return <PaymentForm back={back} next={next}/>
            case 100: return <div>{OrderLoading ? <ScaleLoader size={30} /> :
                <Confirm> <p>Your order is now confirmed</p> <span>You will recieve the confirmation mail shortly</span> <StyledLink to="/">Continue shopping</StyledLink></Confirm>}</div>
            default : return 
        }
    }
    useEffect(() => {
        if (bar.current) {
            bar.current.style.backgroundImage = `linear-gradient(to right , blue ${activeStep}%, gray 1%)`
        }
    }, [activeStep])

    useEffect(() => {
        if (cart) {
            dispatch(fetchToken(cart))
        }
    }, [dispatch])

    return (
        <Wrapper>
            {loading ? <ScaleLoader color="red"/>:
                <>
                    <Container>
                        <ProgessBar ref={bar}>
                            <div className='box left'>
                                <Span>Shipping address</Span>
                                <Ball >{activeStep > 0 ? <FaCheck /> : 1}</Ball>
                            </div>
                            <div className='box middle'>
                                <Span>payment information</Span>
                                <Ball >{activeStep > 50 ? <FaCheck /> : 2}</Ball>
                            </div>
                            <div className='box'>
                                <Span>confirmation</Span>
                                <Ball >{activeStep >= 100 ? <FaCheck /> : 3}</Ball>
                            </div>
                        </ProgessBar>

                        <FormComponent>
                            
                        </FormComponent>
                    </Container>
                    </>
                }
        </Wrapper>
    )
}

export default Checkout
