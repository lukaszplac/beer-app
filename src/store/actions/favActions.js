import * as actionTypes from '../actions/actionTypes';
import {fb_instance as axios} from '../../axios-instances';


export const onAddFavoriteBeer = (beerId) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        beerId: beerId
    }
}

export const onRemoveFavoriteBeer = () => {
    return {
        type: actionTypes.REM_FAVORITE
    }
}

export const onGetFavoriteBeers = (data) => {
    return {
        type: actionTypes.GET_FAVORITES,
        favBeers: data
    }
}

export const onDatabaseCallError = (error) => {
    return {
        type: actionTypes.ON_DB_ERROR
    }
}

export const addFavorite = (beerId, uderId) => {
    const data = {
        id: beerId
    }
    return dispatch => {
        axios.post('/favBeers.json', data )
                   .then(response => {
                       dispatch(onAddFavoriteBeer(beerId))
                   })
                   .catch(error => {
                       dispatch(onDatabaseCallError(error))
                   })
    }
}

export const removeFavorite = (docId) => {
    return dispatch => {
        axios.delete('/favBeers/'+docId+'.json')
                   .then(response => {
                       dispatch(onRemoveFavoriteBeer())
                   })
                   .catch(error => {
                       dispatch(onDatabaseCallError(error))
                   })
    }
}

export const getFavorites = () => {
    return dispatch => {
        axios.get('/favBeers.json')
             .then(response => {
                 dispatch(onGetFavoriteBeers(response.data))
             })
             .catch(error => {
                 dispatch(onDatabaseCallError(error))
             })
    }
}