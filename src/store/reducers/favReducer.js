import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favBeers: {},
    error: false,
    processing: false,
    adding: false,
    removing: false,
    full: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ON_PROCESSING:
            return  {
                ...state,
                processing: true,
                error: false
            }
        case actionTypes.ADDING_IN_PROGRESS:
            return  {
                ...state,
                adding: true,
                removing: false
            }
        case actionTypes.DELETE_ALL_DB:
            return  {
                ...state,
                favBeers: [],
                processing: false,
                removing: false
            }
        case actionTypes.REMOVING_IN_PROGRESS:
            return  {
                ...state,
                adding: false,
                removing: true
            }
        case actionTypes.ADD_FAVORITE_DB:
            let newBeer = { };
            newBeer[action.docId] = {id: action.beerId};
            return {
                ...state,
                favBeers: {...state.favBeers, ...newBeer},
                error: false,
                processing: false,
                adding: false,
                removing: false,
                full: false
            };
        case actionTypes.REM_FAVORITE_DB:
            let favsCopy = {...state.favBeers};
            delete favsCopy[action.docId];
            return {
                ...state,
                favBeers: {...favsCopy},
                error: false,
                processing: false,
                adding: false,
                removing: false,
                full: false
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
     case actionTypes.FAV_FULL:
            return {
                ...state,
                full: true,
                processing: false,
                error: false,
                adding: false,
                removing: false
            }
        default:
            return state;    
    }   
}

export default reducer;