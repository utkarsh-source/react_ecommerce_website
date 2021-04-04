import { createStore, applyMiddleware, combineReducers} from 'redux' 
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartManager, fetchProductReducer, fetctCountriesReducer, generateTokenReducer, fetctsubdivisionReducer, fetchOptionsReducer, setFormReducer, fullfillOrderReducer} from './reducers'


const rootreducer = combineReducers({
    products: fetchProductReducer,
    cart: cartManager,
    country: fetctCountriesReducer,
    token: generateTokenReducer,
    subdivisions: fetctsubdivisionReducer,
    options: fetchOptionsReducer,
    form: setFormReducer,
    order : fullfillOrderReducer
})
const store = createStore(rootreducer, composeWithDevTools(applyMiddleware(thunk)))

export default store