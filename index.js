const redux = require('redux');
const createStore = redux.createStore;

const CAKE_ORDERED = 'CAKE_ORDERED';

// action creator
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
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

unsubscribe()