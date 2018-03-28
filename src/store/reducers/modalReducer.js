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
                loadingModal: true,
                error: false
            }
        }
        case (actionTypes.GET_MODAL_BEERS_LOADING):
            return {
                ...state,
                loadingModalBeers: true,
                error: false
            }
        case (actionTypes.GET_MODAL_BEERS_ABV):
            let beersAbv = action.beers.filter((beer) => beer.abv !== null).sort((p, n) => p.abv - n.abv).slice(0,3);
            return {
                ...state,
                beersModal: [...beersAbv],
                loadingModalBeers: false,
                error: false
            }
        case (actionTypes.GET_MODAL_BEERS_IBU):
            let sorted = action.beers.filter((beer) => beer.ibu !== null).sort((p, n) => p.ibu - n.ibu);
            let beersIbu = sorted.slice(-3);
            return {
                ...state,
                beersModal: [...beersIbu],
                loadingModalBeers: false,
                error: false
            }
        case (actionTypes.GET_ONE_BEER):
            return {
                ...state,
                oneBeer: [...action.beer],
                loadingModal: false,
                error: false
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