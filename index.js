const CAKE_ORDERED = 'CAKE_ORDERED';

// action
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