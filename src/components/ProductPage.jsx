import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import { accessCart, fetchProduct } from '../redux/actionCreater'
import { GridLoader } from 'react-spinners'
import gsap from 'gsap'

export const PageWrapper = styled.section`
    position: relative;
    padding: 2rem; 
    width: 100%;
    max-height: max-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
    background:#f4ff95;
    overflow-y: scroll;
    @media screen and (max-width: 768px){
        &{
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;

const Loader = styled.div`
    position: absolute;
    height: 100vh;
    width : 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

function ProductPage() {
    const { data : products , loading} = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProduct())
        dispatch(accessCart())
    }, [dispatch])


    return (
        <>
            {loading ?
                <Loader>
                    <GridLoader loading={loading} color='#ff9100' size={30} />
                </Loader>
                :
                <PageWrapper>
                    {products?.map((product) => <Product  product={product} key={product.id} />)}
                </PageWrapper>}
        </>
    )
}

export default ProductPage
