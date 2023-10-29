const redux = require('redux');
const createStore = redux.createStore;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

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

// initial state
const initialState = {
    numOfCakes: 10
}

// reducer
// (prevState, action) => newState
const reducer = (state = initialState, action) => {
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

const store = createStore(reducer);
console.log('initial state', store.getState());

// the store.subscribe() return a function to unsubscribe from the store
const unsubscribe = store.subscribe(() => {
    console.log('update state', store.getState())
})

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

store.dispatch(restockCake(5))

unsubscribe()