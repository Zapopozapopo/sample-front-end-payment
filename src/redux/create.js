import {createStore as _createStore, applyMiddleware} from 'redux';
import clientMiddleware from './middleware/clientMiddleware';
import {instance} from '../helpers/apiClient';
import reducer from './modules/reducer';

const middleware = [clientMiddleware(instance)];

let finalCreateStore = applyMiddleware(...middleware)(_createStore);


const store = finalCreateStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;