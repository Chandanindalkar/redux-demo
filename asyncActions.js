// this code runs on:
// "redux": "^4.1.2",
// "redux-thunk": "^2.4.1"

// higher version of redux-thunk results in a middleware not being a function
// higher version of redux results in a upstream dependency conflict

const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// Making async api calls to fetch data from an endpoint 
// and use that data in an application

// typical data fetch initial state
// loading property is to indicate data being fetched and can be used to display loading spinner
const initialState = {
    loading: true,
    users: [],
    error: ''
}

// Actions types
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// action creators
const fetchUsersRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}
const fetchUsersSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}
const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
    
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
    
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}

// const usernameExtractor = (singleUser) => {
//     return singleUser.name
// }

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequested())
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // const users = response.data.map( user => usernameExtractor(user)) //try json manipulation
                const users = response.data.map( user => user.name) //try json manipulation
                dispatch(fetchUsersSucceeded(users));
            })
            .catch( error => {
                dispatch(fetchUsersFailed(error.message)); // error.message
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchUsers())
