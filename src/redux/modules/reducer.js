import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {product} from './product.reducer';
import {cart} from "./cart.reducer";
import {auth} from "./auth.reducer";

const reducer = combineReducers({
    form: formReducer,
    product:product,
    cart:cart,
    auth:auth
});

export default reducer;
