import React from 'react'
import styled from 'styled-components'
import logo from './images/commerce.png'
import { FaShoppingCart } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'


const Nav = styled.header`
    position: sticky;
    top: 0px;
    height: max-content;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    z-index: 999;
    background-color: #ffd000;
    border: 0.2rem solid black;
    &> div{
        display: flex;
        align-items: center;
    }
`;

const Logo = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bolder;
    & > img{
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        margin-right: 1rem;
    }
    &  span{
        font-size: 3rem;
        font-weight: bolder;
        color: red;
    }

`

const CartMenu = styled.div`
    position: relative;
    width: max-content;
    height: max-content;
    cursor: pointer;
    color: black;
    & .nav_cart_icon{
        font-size: 3rem;
    }
`;

const Badge = styled.div`
    position: absolute;
    border-radius: 50%;
    top: -0.6rem;
    right: -0.6rem;
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    color: white;
    font-weight: bolder;
    background-color: red;
    font-size: 1.3rem;
`
const Home = styled.button`
    background-color: #e70000;
    border-radius: 0.2rem;
    text-decoration: none;
    color: white;
    font-weight :bold;
    display: grid;
    place-items: center;
    border: none;
    cursor: pointer;
    margin-right: 3rem;
    width: 8rem;
    height: 3rem;
    font-size: 1.2rem;
`

function NavBar() {
    const location = useLocation();
    const { cart } = useSelector(state => state.cart)
    return (
        <Nav>
            <Logo>
                <img src={logo} alt="Logo" />
                <div><span>E</span>commerce</div>
            </Logo>
            <div>
                {location.pathname === '/' ?
                null : <Home as={Link} to='/'>Home</Home>}
                {location.pathname === '/cart' ?
                    <CartMenu >
                        <FaShoppingCart className="nav_cart_icon" />
                    <Badge>{cart?.total_items}</Badge>
                    </CartMenu> : 
                <CartMenu as={Link} to="/cart">
                        <FaShoppingCart className="nav_cart_icon" />
                    <Badge>{cart?.total_items || '0'}</Badge>
                </CartMenu>
            }
            </div>
        </Nav>
    )
}

export default NavBar
