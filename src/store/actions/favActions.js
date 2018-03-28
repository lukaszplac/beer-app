import * as actionTypes from '../actions/actionTypes';
import {fb_instance as axios} from '../../axios-instances';


export const onAddFavoriteBeer = (docName, beerId) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        beerId: beerId,
        docId: docName
    }
}

export const onRemoveFavoriteBeer = (docId) => {
    return {
        type: actionTypes.REM_FAVORITE,
        docId: docId
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
                       dispatch(onAddFavoriteBeer(response.data.name, beerId))
                   })
                   .catch(error => {
                       dispatch(onDatabaseCallError(error))
                   })
    }
}

export const removeFavorite = (docId, beerId) => {
    return dispatch => {
        axios.delete('/favBeers/'+docId+'.json')
                   .then(response => {
                       dispatch(onRemoveFavoriteBeer(docId))
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