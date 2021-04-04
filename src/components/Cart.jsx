import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import CartItem from './CartItem'
import cartSvg from './images/cart.svg'
import { Link } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import { emptyCart } from '../redux/actionCreater'
import { BeatLoader } from 'react-spinners'
import {useHistory} from 'react-router-dom'

const MainWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background-color: #f4ff95;
`

const CartWrapper = styled.section`
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: center;
    padding: 1rem;
    height: max-content;
    @media screen and (max-width: 768px){
        &{
            width: 100%;
        }
    }
`;

const Illustration = styled.div`
    position: fixed;
    right: 0px;
    top: 15%;
    width: 50%;
    height: 40rem;
    z-index: 1;
    & >img{
        width: 100%;
        height: 100%;
        transform:  rotateY(180deg);
    }
    @media screen and (max-width: 768px){
        &{
            display: none;
        }
    }
`
const Warning = styled.h1`
    display: inline-block;
    color: black;
    padding: 1rem 2rem;
    background-color: rgb(255, 0, 0, 0.2);
    margin: 2rem;
    width: max-content;
    border-radius: 0.5rem;
    font-size: 2rem;
`
const Title = styled.h1`
    font-size: 3rem;
    font-weight: bolder;
    text-align: center;
    margin-top: 2rem;
`;

const Div = styled.section`
    display: flex;
    width: 100%;
    margin-top: 2rem;
    min-height: 100vh;
    overflow: hidden;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.3rem;
    font-size: 1.5rem;
    background-color: #1ba000;
`;

const Subtotal = styled.div`
    position: sticky;
    bottom: 0px;
    width: 100%;
    height: max-content;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffd000;
    border: 2px solid black;
    & >.subtotal{
        font-size: 3rem;
        color: black;
        font-weight: bolder;
        @media screen and (max-width: 300px) {
            font-size: 2.5rem;
        }
    }
    &  >div{
        display: flex;
        align-items: center;
        & button{
            border: none;
            padding: 1rem 2rem;
            color: white;
            border-radius: 0.3rem;
            cursor: pointer;
        }
    }
`;

const Checkout = styled.button`
    text-decoration: none;
    color: white;
    padding: 1rem 2rem;
    color: white;
    border-radius: 0.3rem;
    filter: contrast(150%);
    font-size: 1.6rem;
    background-color: ${({disabled})=> disabled ? 'gray' : '#008a00'};

`
const Remove = styled.button`
    margin-right: 2rem;
    font-size: 1.6rem;
    background-color: ${({disabled})=> disabled ? 'gray' : 'red'};
`

function Cart() {
    const { cart, loading } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)
    const history = useHistory();
    const EmptyCart = () => {
        return (
            <>
                <Warning>Your Cart is currently empty, please add an item...</Warning>
                <StyledLink to="/">Shop Now</StyledLink>
            </>
        )
    }
    useEffect(() => {
        console.log(loading)
        if (!loading) {
            setLoading(false)
        }
    }, [loading])

    return (
        <>
            <MainWrapper>
             <Title >Your Shopping Cart</Title>
             <Div>
                <CartWrapper>
                    {!cart?.line_items?.length ? <EmptyCart /> :
                            cart.line_items.map((product) => <CartItem
                                key={product.id}
                                product={product}
                            />
                            )}
                </CartWrapper>
                <Illustration>
                     <img src={cartSvg} alt="Cart"/>
                </Illustration>
            </Div>
            </MainWrapper>
            <Subtotal>
                <span className='subtotal'>{cart?.subtotal?.formatted_with_symbol}</span>
                    <div>
                    <Remove onClick={() => {
                        setLoading(true)
                        dispatch(emptyCart())
                    }} disabled={!cart.total_items}>{isLoading ? <BeatLoader loading={isLoading} size={10} color="white" /> : 'remove all'}</Remove>
                    <Checkout onClick={() => history.push('/checkout')} disabled={!cart.total_items} >Checkout</Checkout>
                    </div>
            </Subtotal>
        </>
    )
}

export default Cart
