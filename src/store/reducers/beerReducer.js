import * as actionTypes from '../actions/actionTypes';

const initialState = {
    beers: [],
    error: false,
    loading: true,
    allFetched: false,
    initialized: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ON_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_FIRST_BEERS:
            return {
                ...state,
                beers: [...action.beers],
                initialized: true,
                loading: false
            }
        case actionTypes.SET_MORE_BEERS:   
            return {
                ...state,
                error: false,
                beers: [...state.beers,...action.beers],
                loading: false
            }
        case actionTypes.FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.FETCHING_DONE:
            return {
                ...state,
                allFetched: true,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;