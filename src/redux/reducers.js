import { ACCESS_CART, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_TOKEN_FAIL, FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS, FULFIL_ORDER_FAIL, FULFIL_ORDER_REQUEST, FULFIL_ORDER_SUCCESS, HANDLE_QUANTITY_FAIL, HANDLE_QUANTITY_REQUEST, HANDLE_QUANTITY_SUCCESS, HANDLE_REMOVE_FAIL, HANDLE_REMOVE_REQUEST, HANDLE_REMOVE_SUCCESS, OPTIONS_FAIL, OPTIONS_REQUEST, OPTIONS_SUCCESS, REFRESH_CART, SET_FORM_DATA, SHIPPING_COUNTRY_FAIL, SHIPPING_COUNTRY_REQUEST, SHIPPING_COUNTRY_SUCCESS, SUBDIVISION_FAIL, SUBDIVISION_REQUEST, SUBDIVISION_SUCCESS } from "./actionType";


const initialState = {
    loading: true,
    data: null,
    error: null
}
export const fetchProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                data : payload,
            }
        case FETCH_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                data: null,
                error : payload,
            }
        default : return state
    }
}
const initialCartState = {
    loading: false,
    cart: null,
    error: null,
}
export const cartManager = (state = initialCartState, { type, payload }) => {
    switch (type) {
        case ACCESS_CART:
            return {
                ...state,
                cart : payload
            }
        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart : payload,
            }
        case ADD_TO_CART_FAIL:
            return {
                ...state,
                loading: false,
                cart: null,
                error : payload,
            }
        case HANDLE_REMOVE_REQUEST:
            return  {
                ...state,
                loading: true,
            }
        case HANDLE_REMOVE_SUCCESS:
            return  {
                ...state,
                loading: false,
                cart : payload
            }
        case HANDLE_REMOVE_FAIL:
            return  {
                ...state,
                error : payload,
            }
        case HANDLE_QUANTITY_REQUEST:
            return  {
                ...state,
                loading: true,
            }
        case HANDLE_QUANTITY_SUCCESS:
            return  {
                ...state,
                loading: false,
                cart : payload
            }
        case HANDLE_QUANTITY_FAIL:
            return  {
                ...state,
                error : payload,
            }
        case EMPTY_CART_REQUEST:
            return  {
                ...state,
                loading : true,
            }
        case EMPTY_CART_SUCCESS:
            return  {
                ...state,
                loading: false,
                cart: payload,
            }
        case EMPTY_CART_FAIL:
            return  {
                ...state,
                loading: false,
                error : payload,
            }
        case REFRESH_CART:
            return  {
                ...state,
                cart : payload
            }
        default : return state
    }
}

const countriesState = {
    loading: true,
    countries: [],
    error: null
}
export const fetctCountriesReducer = (state = countriesState, { type, payload }) => {
    switch (type) {
        case SHIPPING_COUNTRY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SHIPPING_COUNTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: payload,
            }
        case SHIPPING_COUNTRY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default : return state
    }
}
const subdivisionsState = {
    loading: false,
    subdivision: [],
    error: null
}
export const fetctsubdivisionReducer = (state = subdivisionsState, { type, payload }) => {
    switch (type) {
        case SUBDIVISION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SUBDIVISION_SUCCESS:
            return {
                ...state,
                loading: false,
                subdivision: payload,
            }
        case SUBDIVISION_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default : return state
    }
}
const optionsState = {
    loading: false,
    options: [],
    error: null
}
export const fetchOptionsReducer = (state = optionsState, { type, payload }) => {
    switch (type) {
        case OPTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case OPTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                options: payload,
            }
        case OPTIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default : return state
    }
}

const tokenState = {
    loading: true,
    token: null,
    error: null,
}
export const generateTokenReducer = (state = tokenState, { type, payload }) => {
    switch (type) {
        case FETCH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload,
            }
        case FETCH_TOKEN_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default : return state
    }
}

const initialForm = {
    formData : {}
}
export const setFormReducer = (state = initialForm, { type, data })=>{
    switch (type) {
        case SET_FORM_DATA:
            return {
                formData: data,
            }
        default : return state
    }
}

const initialOrder = {
    loading: true,
    order: null,
    error: null,
}
export const fullfillOrderReducer = (state = initialOrder, { type, payload }) => {
    switch (type) {
        case FULFIL_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FULFIL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: payload,
            }
        case FULFIL_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default : return state
    }
}
