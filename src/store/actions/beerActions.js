import * as actionTypes from './actionTypes';
import axios from '../../axios-instances';


export const setFirstBeers = (data) => {
    return {
        type: actionTypes.SET_FIRST_BEERS,
        beers: data
    }
}

export const setMoreBeers = (data) => {
    return {
        type: actionTypes.SET_MORE_BEERS,
        beers: data
    }
}

export const onLoading = () => {
    return {
        type: actionTypes.ON_LOADING
    }
}

export const fetchingBeersError = () => {
    return {
        type: actionTypes.FETCHING_ERROR
    }
}

export const fetchingDone = () => {
    return {
        type: actionTypes.FETCHING_DONE
    }
}

export const addToStore = (beer) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        beer: beer
    }
}

export const remFavoriteFromStore = (beer) => {
    return {
        type: actionTypes.REM_FAVORITE,
        beer: beer
    }
}

export const addAllFavsToStore = (beers) => {
    return {
        type: actionTypes.ADD_ALL_FAVS_TO_STORE,
        beers: beers
    }
}

export const initialLoad = (page) => {
    return dispatch => {
        dispatch(onLoading());
        //getting only 20 per page
        let url = '/beers?page=' + page + "&per_page=20" 
        axios.get(url)
             .then(response => {
                 dispatch(setFirstBeers(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}

export const addFavoriteToStore = (beer) => {
    return dispatch => {
        dispatch(onLoading());
        let url = '/beers/?ids=' + beer.id;  // "&per_page=80" 
        axios.get(url)
             .then(response => {
                 dispatch(addToStore(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}

export const onLoadMore = (page) => {
    return dispatch => {
        dispatch(onLoading());
        //getting only 20 per page
        let url = '/beers?page=' + page + "&per_page=20" 
        axios.get(url)
             .then(response => {
                 response.data.length === 0 ? dispatch(fetchingDone()) : dispatch(setMoreBeers(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}

export const getBeersByIds = (idPath) => {
    return dispatch => {
        dispatch(onLoading());
        let url = '/beers/?ids=' + idPath;
        axios.get(url)
             .then(response => {
                 dispatch(addAllFavsToStore(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}
