const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// action creator
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}
function restockCake(qty) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}
function orderIceCream() {
    return {
        type: ICECREAM_ORDERED,
        payload: 1,
    }
}
function restockIceCream(qty) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// initial state
const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    numOfIceCreams: 20,
}

// reducer
// (prevState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cakes: cakeReducer, 
    icecreams: iceCreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state', store.getState());

// the store.subscribe() return a function to unsubscribe from the store
const unsubscribe = store.subscribe(() => {})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))

const actions = bindActionCreators(
    {
        orderCake, restockCake, orderIceCream, restockIceCream
    }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(1)

unsubscribe()