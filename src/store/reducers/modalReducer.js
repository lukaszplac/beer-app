import * as actionTypes from '../actions/actionTypes';

const initialState = {
    oneBeer: [],
    abvGTbeers: [],
    error: false,
    loadingModal: false,
    loadingABV: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.ON_LOADING_MODAL): {
            return {
                ...state,
                loadingModal: true
            }
        }
        case (actionTypes.GET_ABV_GT_LOADING):
            return {
                ...state,
                loadingABV: true
            }
        case (actionTypes.GET_ABV_GT):
            return {
                ...state,
                abvGTbeers: [...action.beers],
                loadingABV: false
            }
        case (actionTypes.GET_ONE_BEER):
            return {
                ...state,
                oneBeer: [...action.beer],
                loadingModal: false
            }
        case (actionTypes.FETCH_MODAL_BEERS_ERROR):
            return {
                ...state,
                error: true,
                loadingModal: false
            }
        default:
            return state;
    }
}

export default reducer;