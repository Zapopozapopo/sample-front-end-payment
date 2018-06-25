import {
    ADD_TO_CART, CHECK_CART,
    DELETE_FROM_CART,
    FETCH_CART_PRODUCTS_FAIL,
    FETCH_CART_PRODUCTS_START,
    FETCH_CART_PRODUCTS_SUCCESS,
    PAY_FAIL,
    PAY_START,
    PAY_SUCCESS,
} from "../../constants/ActionTypes";
import {getCart} from "../../helpers/cartStorage";
import {CURRENCY} from "../../helpers/config";

const initialState={
    idList:{}
};


export function cart(state=initialState, action={}) {
    switch (action.type){
        case(ADD_TO_CART):{
            return {
                ...state,
                idList:{...state.idList, [action.result]: (state.idList[action.result] || 0) + 1}
            }
        }
        case(DELETE_FROM_CART):{
            let deleteProduct = state.cartProducts.find(p=>p.product._id === action.result);
            return{
                ...state,
                idList: {...state.idList, [action.result]: undefined},
                totalPrice: state.totalPrice-(deleteProduct.product.price*deleteProduct.quantity),
                cartProducts: state.cartProducts.filter(product=>product!==deleteProduct)
            }
        }
        case(CHECK_CART):{
            return{
                ...state,
                idList:action.cartStorage,
            }
        }
        case(FETCH_CART_PRODUCTS_START):{
            return{
                ...state,
                isFetching:true,
            }
        }
        case(FETCH_CART_PRODUCTS_SUCCESS):{
            return{
                ...state,
                isFetching:false,
                cartProducts:action.result.data.products,
                totalPrice:action.result.data.totalPrice
            }
        }
        case(FETCH_CART_PRODUCTS_FAIL):{
            return{
                ...state,
                isFetching:false
            }
        }
        case(PAY_START):{
            return{
                ...state,
                isPay:true
            }
        }
        case(PAY_SUCCESS):{
            return{
                ...state,
                isPay:false,
                idList:{},
                cartProducts:[],
                totalPrice:0
            }
        }
        case(PAY_FAIL):{
            return{
                ...state,
                isPay:false
            }
        }
        default: return state;
    }
}

export function addToCart(productId){
    return {
        types: [ null, ADD_TO_CART, null ],
        promise: () => Promise.resolve(productId),
    };
}
export function deleteFromCart(productId){
    return {
        types: [ null, DELETE_FROM_CART, null ],
        promise: () => Promise.resolve(productId),
    };
}
export function getCartProducts(idList){
    return {
        types: [ FETCH_CART_PRODUCTS_START, FETCH_CART_PRODUCTS_SUCCESS, FETCH_CART_PRODUCTS_FAIL ],
        promise: (client) => client.post(`api/product/getCarts`, {idList}),
    };
}

export function pay(idList,amount, description, token){
        return {
            types: [PAY_START, PAY_SUCCESS, PAY_FAIL],
            promise: (client) => client.post(`api/pay/test`,
                { payment_info:{description,
                                source: token.id,
                                currency: CURRENCY,
                                amount: amount * 100},
                    idList
                }
            ),
        }
}

export function checkCartStorage(){
    let cartStorage=getCart();
    if(cartStorage){
        return function(dispatch){
            dispatch({type:CHECK_CART, cartStorage});
        }
    }
}