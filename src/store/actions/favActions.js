import * as actionTypes from '../actions/actionTypes';
import {fb_instance as axios} from '../../axios-instances';
import {addFavoriteToStore, remFavoriteFromStore, deleteAllFromStore} from '../actions/index';


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

//action just for animation on adding fav
export const addingInProgress = () => {
    return {
        type: actionTypes.ADDING_IN_PROGRESS
    }
}

//action just for animation on adding fav
export const removingInProgress = () => {
    return {
        type: actionTypes.REMOVING_IN_PROGRESS
    }
}

export const favFull = () => {
    return {
        type: actionTypes.FAV_FULL
    }
}

export const onDeleteAll = () => {
    return {
        type: actionTypes.DELETE_ALL_DB
    }
}

export const addFavoriteDB = (beer, length) => {
    const data = {
        id: beer.id
    }
    return dispatch => {
        if (length === 30) dispatch(favFull());
        else {
            dispatch(addingInProgress());
            dispatch(onProcessing());
            axios.post('/favBeers.json', data )
                    .then(response => {
                        dispatch(onAddFavoriteBeer(response.data.name, beer.id));
                        dispatch(addFavoriteToStore(beer));
                    })
                    .catch(error => {
                        dispatch(onDatabaseCallError(error))
                    })
        }
    }
}

export const removeFavoriteDB = (beer, docId) => {
    return dispatch => {
        dispatch(removingInProgress());
        dispatch(onProcessing());
        axios.delete('/favBeers/'+docId+'.json')
                   .then(response => {
                       dispatch(onRemoveFavoriteBeer(docId));
                       dispatch(remFavoriteFromStore(beer));
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

export const clearFavsDB = () => {
    return dispatch => {
        dispatch(removingInProgress());
        dispatch(onProcessing());
        axios.delete('/favBeers.json')
             .then(response => {
                 dispatch(onDeleteAll(response.data));
                 dispatch(deleteAllFromStore());
             })
             .catch(error => {
                 dispatch(onDatabaseCallError(error))
             })
    }
}