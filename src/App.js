import React from 'react'
import './App.css'
import ProductPage from './components/ProductPage'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import { Switch, Route } from 'react-router-dom'
import Checkout from './components/Checkout'

function App() {

    return (
        <div>
            <Switch>
                <Route path='/' exact>
                    <NavBar />
                    <ProductPage/>
                </Route>
                <Route path="/cart" exact>
                    <NavBar/>
                    <Cart/>
                </Route>
                <Route path='/checkout' exact>
                    <Checkout/>
                </Route>
            </Switch>
        </div>
    )
}

export default App
