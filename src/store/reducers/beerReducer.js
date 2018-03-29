import * as actionTypes from '../actions/actionTypes';

const initialState = {
    beers: [],
    favs: [],
    error: false,
    loading: false,
    allFetched: false,
    initialized: false,
    page: 1
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ON_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.SET_FIRST_BEERS:
            return {
                ...state,
                beers: [...action.beers],
                initialized: true,
                loading: false,
                error: false,
                page: state.page + 1
            }
        case actionTypes.SET_MORE_BEERS:   
            return {
                ...state,
                error: false,
                beers: [...state.beers,...action.beers],
                loading: false,
                page: state.page + 1
            }
        case actionTypes.ADD_ALL_FAVS_TO_STORE:   
            return {
                ...state,
                error: false,
                favs: [...action.beers],
                loading: false
            }
        case actionTypes.REM_FAVORITE:
            let newFavs = state.favs.filter((ob) => ob.id !== action.beer.id);
            return {
                ...state,
                error: false,
                loading: false,
                favs: [...newFavs]
            }
        case actionTypes.ADD_FAVORITE:
            return {
                ...state,
                error: false,
                favs: [...state.favs, action.beer],
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
                loading: false,
                error: false
            }
        default:
            return state;
    }
}

export default reducer;