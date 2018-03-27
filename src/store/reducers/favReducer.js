import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favBeers: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_FAVORITE:
            return {
                ...state,
                favBeers: [...state.favBeers, action.beerId],
                error: false
            };
        case actionTypes.REM_FAVORITE:
            return {
                ...state,
                error: false
            };
        case actionTypes.GET_FAVORITES:
            return {
                ...state,
                favBeers: Object.assign({}, action.favBeers),
                error: false
            };
        case actionTypes.ON_DB_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;    
    }   
}

export default reducer;