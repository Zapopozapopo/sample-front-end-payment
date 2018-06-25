import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL
} from "../../constants/ActionTypes";

const initialState ={
    products:[]
};

export function product(state= initialState, action ={}){
    switch(action.type){
        case(FETCH_PRODUCTS_START):{
            return{
                ...state,
                isFetchingProducts:true
            }
        }
        case(FETCH_PRODUCTS_SUCCESS):{
            return{
                ...state,
                isFetchingProducts:false,
                products:action.result.data
            }
        }
        case(FETCH_PRODUCTS_FAIL):{
            return{
                ...state,
                isFetchingProducts:false
            }
        }
        default:{
            return state
        }
    }
}

export function getProducts(){
    return{
        types: [FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL],
        promise: (client) => client.get(`api/product/getAll`),
    }
}
