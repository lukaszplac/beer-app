import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favBeers: {},
    error: false,
    processing: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ON_PROCESSING:
            return  {
                ...state,
                processing: true,
                error: false
            }
        case actionTypes.ADD_FAVORITE_DB:
            let newBeer = { };
            newBeer[action.docId] = {id: action.beerId};
            return {
                ...state,
                favBeers: {...state.favBeers, ...newBeer},
                error: false,
                processing: false
            };
        case actionTypes.REM_FAVORITE_DB:
            let favsCopy = {...state.favBeers};
            delete favsCopy[action.docId];
            return {
                ...state,
                favBeers: {...favsCopy},
                error: false,
                processing: false
            };
        case actionTypes.GET_FAVORITES_DB:
            return {
                ...state,
                favBeers: Object.assign({}, action.favBeers),
                error: false,
                processing: false
            };
        case actionTypes.ON_DB_ERROR:
            return {
                ...state,
                error: true,
                processing: false
            }
        default:
            return state;    
    }   
}

export default reducer;