import * as actionTypes from '../actions/actionTypes';
import {fb_instance as axios} from '../../axios-instances';
import {addFavoriteToStore, remFavoriteFromStore} from '../actions/index';


export const onAddFavoriteBeer = (docName, beerId) => {
    return {
        type: actionTypes.ADD_FAVORITE_DB,
        beerId: beerId,
        docId: docName
    }
}

export const onRemoveFavoriteBeer = (docId) => {
    return {
        type: actionTypes.REM_FAVORITE_DB,
        docId: docId
    }
}

export const onGetFavoriteBeers = (data) => {
    return {
        type: actionTypes.GET_FAVORITES_DB,
        favBeers: data
    }
}

export const onDatabaseCallError = (error) => {
    return {
        type: actionTypes.ON_DB_ERROR
    }
}

export const onProcessing = () => {
    return {
        type: actionTypes.ON_PROCESSING
    }
}

export const addFavoriteDB = (beer) => {
    const data = {
        id: beer.id
    }
    return dispatch => {
        dispatch(onProcessing());
        dispatch(addFavoriteToStore(beer));
        axios.post('/favBeers.json', data )
                   .then(response => {
                       dispatch(onAddFavoriteBeer(response.data.name, beer.id))
                   })
                   .catch(error => {
                       dispatch(onDatabaseCallError(error))
                   })
    }
}

export const removeFavoriteDB = (beer, docId) => {
    return dispatch => {
        dispatch(onProcessing());
        dispatch(remFavoriteFromStore(beer));
        axios.delete('/favBeers/'+docId+'.json')
                   .then(response => {
                       dispatch(onRemoveFavoriteBeer(docId))
                   })
                   .catch(error => {
                       dispatch(onDatabaseCallError(error))
                   })
    }
}

export const getFavoritesDB = () => {
    return dispatch => {
        dispatch(onProcessing());
        axios.get('/favBeers.json')
             .then(response => {
                 dispatch(onGetFavoriteBeers(response.data))
             })
             .catch(error => {
                 dispatch(onDatabaseCallError(error))
             })
    }
}