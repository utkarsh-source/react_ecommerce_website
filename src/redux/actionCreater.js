import { ACCESS_CART, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_TOKEN_FAIL, FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS, FULFIL_ORDER_FAIL, FULFIL_ORDER_REQUEST, FULFIL_ORDER_SUCCESS, HANDLE_QUANTITY_FAIL, HANDLE_QUANTITY_REQUEST, HANDLE_QUANTITY_SUCCESS, HANDLE_REMOVE_FAIL, HANDLE_REMOVE_REQUEST, HANDLE_REMOVE_SUCCESS, OPTIONS_FAIL, OPTIONS_REQUEST, OPTIONS_SUCCESS, REFRESH_CART, SET_FORM_DATA, SHIPPING_COUNTRY_FAIL, SHIPPING_COUNTRY_REQUEST, SHIPPING_COUNTRY_SUCCESS, SUBDIVISION_FAIL, SUBDIVISION_REQUEST, SUBDIVISION_SUCCESS } from "./actionType"
import { commerce } from '../components/lib/commerce'



export const accessCart = () => {
    return async function (dispatch) {
        commerce.cart.retrieve().then(cart => dispatch({ type: ACCESS_CART, payload: cart}))
    }
}

export const fetchProduct = () => {
    return async function (dispatch) {
        dispatch({ type: FETCH_PRODUCT_REQUEST })
        commerce.products.list().then(({ data}) => dispatch({type :FETCH_PRODUCT_SUCCESS, payload: data})).catch((err)=> dispatch({type : FETCH_PRODUCT_FAIL , payload: err}))
    }
}

export const addToCart = (productId, quantity) => {
    return async function (dispatch) {
        dispatch({ type: ADD_TO_CART_REQUEST });
        commerce.cart.add(productId, quantity).then(({cart})=> dispatch({ type: ADD_TO_CART_SUCCESS, payload: cart})).catch(err => dispatch({ type: ADD_TO_CART_FAIL, payload: err}))
    }
}

export const handleQuantity = (productId, quantity) => {
    return async function (dispatch) {
        dispatch({ type: HANDLE_QUANTITY_REQUEST })
        commerce.cart.update(productId, { quantity }).then(({cart})=> dispatch({type: HANDLE_QUANTITY_SUCCESS, payload: cart})).catch(err=> dispatch({type: HANDLE_QUANTITY_FAIL, payload: err}))
    }
}
export const handleRemove = (productId) => {
    return async function (dispatch) {
        dispatch({ type: HANDLE_REMOVE_REQUEST })
        commerce.cart.remove(productId).then(({cart})=> dispatch({type: HANDLE_REMOVE_SUCCESS, payload: cart})).catch(err=> dispatch({type: HANDLE_REMOVE_FAIL, payload: err}))
    }
}
export const emptyCart = () => {
    return async function (dispatch) {
        dispatch({ type: EMPTY_CART_REQUEST })
        commerce.cart.empty().then(({cart}) => dispatch({type: EMPTY_CART_SUCCESS, payload: cart})).catch(err=> dispatch({type: EMPTY_CART_FAIL, payload: err}))
    }
}

export const fetchToken = (cart) => {
    return async function (dispatch) {
        dispatch({ type: FETCH_TOKEN_REQUEST })
        commerce.checkout.generateToken(cart.id, {type : 'cart'}).then(token=> dispatch({type: FETCH_TOKEN_SUCCESS, payload: token})).catch(err => dispatch({type: FETCH_TOKEN_FAIL, payload: err}))
    }
}

export const fetchCountries = (checkoutId) => {
    return async function (dispatch) {
        dispatch({ type: SHIPPING_COUNTRY_REQUEST })
        commerce.services.localeListShippingCountries(checkoutId).then(({countries})=> dispatch({type: SHIPPING_COUNTRY_SUCCESS, payload: countries})).catch(err=> dispatch({type: SHIPPING_COUNTRY_FAIL, payload: err}))
    }
}

export const fetchSubdivision = (countryCode) => {
    return async function (dispatch) {
        dispatch({ type: SUBDIVISION_REQUEST })
        commerce.services.localeListSubdivisions(countryCode).then(({subdivisions}) => dispatch({type: SUBDIVISION_SUCCESS, payload: subdivisions})).catch(err=> dispatch({type: SUBDIVISION_FAIL, payload: err}))
    }
}

export const fetchOptions = (tokenId, country, region=null) => {
    return async function (dispatch) {
        dispatch({ type: OPTIONS_REQUEST })
        commerce.checkout.getShippingOptions(tokenId, { country, region}).then(options => dispatch({type: OPTIONS_SUCCESS, payload: options})).catch(err=> dispatch({type: OPTIONS_FAIL, payload: err}))
    }
} 

export const setFormData = (data) => {
    return {
        type: SET_FORM_DATA,
        data,
    }
}

export const fullfillOrder = (tokenId, newOrder) => {
    return async function (dispatch) {
        dispatch({ type: FULFIL_ORDER_REQUEST })
        commerce.checkout.capture(tokenId, newOrder).then((incomingOrder=> dispatch({type: FULFIL_ORDER_SUCCESS, payload : incomingOrder}))).catch(err=> dispatch({type: FULFIL_ORDER_FAIL, payload: err}))
    }
}

export const refreshCart = () => {
    return async function (dispatch) {
        commerce.cart.refresh().then(cart=> dispatch({type : REFRESH_CART, payload : cart})).catch(err=> console.log(err))
    }
}