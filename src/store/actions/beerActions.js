import * as actionTypes from './actionTypes';
import axios from '../../axios-instances';

export const setMoreBeers = (data) => {
    console.log(data);
    return {
        type: actionTypes.SET_MORE_BEERS,
        beers: data
    }
}

export const setFirstBeers = (data) => {
    console.log(data);
    return {
        type: actionTypes.SET_FIRST_BEERS,
        beers: data
    }
}

export const fetchingBeersError = () => {
    return {
        type: actionTypes.FETCHING_ERROR
    }
}

export const onLoading = () => {
    return {
        type: actionTypes.ON_LOADING
    }
}

export const fetchingDone = () => {
    return {
        type: actionTypes.FETCHING_DONE
    }
}

export const initialLoad = (page) => {
    return dispatch => {
        dispatch(onLoading());
        //getting only 20 per page
        let url = '/beers?page=' + page + "&per_page=80" 
        axios.get(url)
             .then(response => {
                 dispatch(setFirstBeers(response.data))              
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
        let url = '/beers?page=' + page + "&per_page=80" 
        axios.get(url)
             .then(response => {
                 response.data.length === 0 ? dispatch(fetchingDone()) : dispatch(setMoreBeers(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}
