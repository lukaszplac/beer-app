import * as actionTypes from '../actions/actionTypes';

const initialState = {
    beersABVGt: [],
    beersABVLt: [],
    beersIBUGt: [],
    beersIBULt: [],
    beersEBCGt: [],
    beersEBCLt: [],
    error: false,
    loading: true,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.ON_LOADING_MODAL): {
            return {
                ...state,
                loading: true
            }
        }
        case (actionTypes.GET_IBU_GT):
            return {
                ...state,
                beersIBUGt: [...action.beers]
            }
        case (actionTypes.FETCH_MODAL_BEERS_ERROR):
            return {
                ...state,
                error: true,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;