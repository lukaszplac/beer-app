import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favBeers: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_FAVORITE:
            return state;
        case actionTypes.GET_FAVORITES:
            return state;
        default:
            return state;    
    }   
} 