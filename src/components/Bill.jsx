import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 30rem;
    overflow-y: scroll;
    padding: 1rem;
`
const Heading = styled.h1`
    color: black;
    font-size: 2.5rem;
    margin-bottom: 2rem;
`
const List = styled.article`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    & >.subTotal >p{
        font-size: 2rem;
        color: green;
        font-weight: bold;
        margin-top: 0.4rem;
    }
    & hr{
        width: 100%;
        border: none;
        height: 0.2rem;
        background-color: #303030;
        margin: 1rem 0px;
    }
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2rem 0px;
    color: black;
    & .cost{
        font-size: 1.5rem;
        color: red;
        font-weight: bold;
    }
    & .item{
        font-size: 1.8rem;
        color: black;
        font-weight: bold;
    }
    & .quantity{
        font-size: 1.2rem;
        color: royalblue;
        font-weight: bold;
        margin-top: 0.3rem;
    }
`;


function Bill() {
    const { token } = useSelector(state => state.token)
    return (
        <Container>
            <Heading>Order Summary</Heading>
            <List>
                {token.live.line_items.map(product => (
                    <ListItem key={product.name}>
                        <div>
                            <h2 className="item">{product.name}</h2>
                            <p className="quantity">Quantity : {product.quantity}</p>
                        </div>
                        <p className="cost">{product.line_total.formatted_with_symbol}</p>
                    </ListItem>
                )
                )}
                <hr/>
                <div className="subTotal">
                    <h2>Total</h2>
                    <p>{token.live.subtotal.formatted_with_symbol}</p>
                </div>
            </List>
        </Container>
    )
}

export default Bill
