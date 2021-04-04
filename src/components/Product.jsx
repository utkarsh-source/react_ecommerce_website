import React, {useEffect, useRef, useState} from 'react'
import styled  from 'styled-components'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/actionCreater';
import {BeatLoader} from 'react-spinners'

const ProductBox = styled.div`
    position: relative;
    height: max-content;
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: box-shadow 0.3s;
    background-color: #ffd000;
    border: 2px solid white;
    &:hover{
        box-shadow: 0px 0px 20px 7px rgb(0, 0, 0, 0.2);
    }
    & > img{
        width: 100%;
        object-fit: contain;
        height: 20rem;
        margin-bottom: 1rem;
        background-color: #fdfdfd;
    }
    & > .product_details{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 0.3rem;
        & > .product_info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0px;
            & > .product_name{
                font-size: 2.2rem;
                color: black;
                font-weight: bolder;
            }
            & > .product_price{
                font-size: 2.2rem;
                color: #ff0000;
                font-weight: bold;
            }
        }
        & >.product_discription{
            font-size: 1.5rem;
            color: black;
            margin: 1rem 0px;
        }
    }
    
`;
const Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    border: none;
    padding: 1rem 3rem;
    background-color: #00ac81;
    border-radius: 0.3rem;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
    &:hover{
        background-color: #bd0048;
    }
    align-self: ${({ right }) => right && 'flex-end'};
    & .icon{
        margin-left: 0.5rem;
        font-size: 1.5rem;
    }
    & > span{
        display: flex;
        align-items: center;
    }
`;


function Product({ product}) {
    const des = useRef(null);
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.cart)
    const [isLoading, setLoading] = useState(false)
    const description = product?.description
    useEffect(() => {
        des.current.innerHTML = description
    }, [description])

    useEffect(() => {
        if (!loading) {
            setLoading(false)
        }
    }, [loading])
    return (
        <ProductBox>
            <img src={product.media.source} alt="Product" />
            <div className="product_details">
                <div className="product_info">
                    <span className='product_name'>{product.name}</span>
                    <span className='product_price'>{product.price.formatted_with_symbol}</span>
                </div>
                <div ref={des} className="product_discription"></div>
                <Btn onClick={() => {
                    dispatch(addToCart(product.id, 1))
                    setLoading(prev=> !prev)
                }} right>
                    {isLoading ?<BeatLoader color='white' size={10} /> :
                        <span>Add to Cart<FaCartPlus className="icon" />
                        </span>}
                </Btn>
            </div>
        </ProductBox>
    )
}

export default Product
