const redux = require('redux');
const createStore  = redux.createStore;
const produce = require('immer').produce;

const initialState = {
  name: 'Vishwas',
  address: {
    street: '123 Main St',
    city: 'Boston',
    state: 'MA'
  }
}

const UPDATE_STREET = 'UPDATE_STREET';

function updateStreet(street) {
    return {
        type: UPDATE_STREET,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STREET':
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            // immer below does the same job as updating the state above
            return produce(state, draft => {
                draft.address.street = action.payload
            })
    
        default: {
            return state
        };
    }
}

const store = createStore(reducer);
console.log('initial state:', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('updated state:', store.getState())
})

store.dispatch(updateStreet('121 City Square'))

unsubscribe()