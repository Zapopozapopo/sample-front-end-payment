import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT_SUCCESS,
    CHECK_USER_TOKEN,

} from '../../constants/ActionTypes'
import {setAuthHeader, removeToken} from '../../helpers/apiClient'
import {removeCart} from "../../helpers/cartStorage";


const initialState ={
    isLogin: false,
    loggingIn: false,
    registerIn: false,
    loginError: false,
    registerError: false
};

export function auth(state= initialState, action={}) {
    switch(action.type){
        case(LOGIN_START):
            return{
                ...state,
                loggingIn:true
            };
        case(LOGIN_SUCCESS):{
            setAuthHeader(action.result.data.token);
              return{
                  ...state,
                  loggingIn:false,
                  isLogin:true,
                  loginError:false
                }
            }
        case(LOGIN_FAIL):{
            return{
                ...state,
                loggingIn:false,
                loginError:action.error.response.data.error
        }
        }
        case(CHECK_USER_TOKEN):{
            return{
                ...state,
                isLogin:true
            };
        }
        case(SIGNUP_START):{
            return{
                ...state,
                registerIn:true
            };
        }
        case(SIGNUP_SUCCESS):{
            return{
                ...state,
                registerIn:false,
                registerError:false
            }
        }
        case(SIGNUP_FAIL):{
            return{
                ...state,
                registerIn:false,
                registerError:action.error.response.data.error
            }
        }
        case(LOGOUT_SUCCESS):{
            return{
                ...state,
                isLogin:false
            }
        }
        default:{
            return state;
        }
    }
}

export function logIn(email, password){
    return {
        types: [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL],
        promise: (client) => client.post(`api/auth/login`, {email,password}),
    };
}

export function signUp(username,email,password){
    return {
        types: [SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL],
        promise: (client) => client.post(`api/auth/signup`, {username,email,password}),
    };
}
export function logout() {
    return {
        types: [null, LOGOUT_SUCCESS, null],
        promise: (client) => new Promise((resolve, reject) => {
            removeToken();
            removeCart();
            resolve();
        })
    };
}

export function checkIsLogin(){
    let token = localStorage.getItem('UserToken');
    if(token){
        setAuthHeader(token);
        return function(dispatch){
            dispatch({type:CHECK_USER_TOKEN});
        }
    }
}