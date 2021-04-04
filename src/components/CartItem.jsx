import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { handleQuantity, handleRemove } from '../redux/actionCreater'
import { BeatLoader} from 'react-spinners'

const ItemWrapper = styled.div`
    position: relative;
    width: 30rem;
    height: max-content;
    background-color: #ffd000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 0.3rem;
    border: 2px solid black;
    & >.container{
        padding: 1rem 1rem;
    }
    &> img{
         width: 100%;
        object-fit: contain;
        height: 20rem;
        margin-bottom: 1rem;
        background-color: #fdfdfd;
    }
    & .item_details{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0px;
        & >.item_info{
            font-size: 2.5rem;
            font-weight: bolder;
            color: black;
        }
        & >.item_price{
            font-size: 2rem;
            font-weight: bolder;
            color: red;
            border-bottom: 1px solid black;
            padding: 1rem 0px;
        }
    }
    & .item_btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        & >.quantity{
            display: flex;
            align-items: center;
            &  button{
                font-size: 1.5rem;
                font-weight: bolder;
                border: none;
                padding:0.5rem 1rem;
                display: grid;
                border-radius: 0.2rem;
                place-items: center;
                cursor: pointer;
            }
            & > span{
                font-size: 2rem;
                font-weight: bolder;
                color: black;
                margin: 0px 2rem;
            }
        }
        & >.remove{
            padding: 1rem 1.5rem;
            border: none;
            background-color: #ff006a;
            color: white;
            font-weight: bolder;
            border-radius: 0.3rem;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 768px){
        &{
            width: 100%;
        }
    }
`

function CartItem({ product}) {
    const initialQuantity = product.quantity
    const [quantity, setQuantity] = useState(initialQuantity);
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.cart)
    const [isLoading, setLoading] = useState(false)
    const decrement = (e) => {
        setQuantity(prev => prev === 1? 1 : prev - 1)
    }
    const increment = (e) => {
        setQuantity(prev => prev + 1)
    }
    const handleRemoveClick = () => {
        setLoading(true)
        dispatch(handleRemove(product.id))
    }
    useEffect(() => {
        dispatch(handleQuantity(product.id, quantity))
    }, [quantity, product.id, dispatch])

    useEffect(() => {
        if (!loading) {
            setLoading(false)
        }
    }, [loading])

    return (
        <ItemWrapper>
            <img src={product.media.source} alt="item" />
            <div className="container">
            <div className="item_details">
                <p className="item_info">{product.name}</p>
                <strong className="item_price">{product.price.formatted_with_symbol}</strong>
            </div>
            <div className="item_btn">
                <div className="quantity">
                    <button  onClick={decrement}>-</button>
                    <span className="count">{quantity}</span>
                    <button  onClick={increment}>+</button>
                </div>
                    <button onClick={handleRemoveClick} className="remove">
                        {isLoading ? <BeatLoader size={10} color='white' /> :
                        "remove" }
                    </button>
                </div>
                </div>
        </ItemWrapper>
    )
}

export default CartItem
