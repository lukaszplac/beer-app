import * as actionTypes from '../actions/actionTypes';

const initialState = {
    oneBeer: [],
    beersModal: [],
    error: false,
    loadingModal: false,
    loadingModalBeers: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.ON_LOADING_MODAL): {
            return {
                ...state,
                loadingModal: true
            }
        }
        case (actionTypes.GET_MODAL_BEERS_LOADING):
            return {
                ...state,
                loadingModalBeers: true
            }
        case (actionTypes.GET_MODAL_BEERS_ABV):
            let beersAbv = action.beers.sort((p, n) => p.abv > n.abv).slice(0,3);
            return {
                ...state,
                beersModal: [...beersAbv],
                loadingModalBeers: false
            }
        case (actionTypes.GET_MODAL_BEERS_IBU):
            let beersIbu = action.beers.sort((p, n) => p.ibu > n.ibu).slice(0,3);
            return {
                ...state,
                beersModal: [...beersIbu],
                loadingModalBeers: false
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