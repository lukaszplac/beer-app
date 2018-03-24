import * as actionTypes from './actionTypes';
import axios from '../../axios-instances';


export const onLoadingModal = () => {
    return {
        type: actionTypes.ON_LOADING_MODAL
    }
}

export const onLoadingBeersABVGt = (data) => {
    return {
        type: actionTypes.GET_ABV_GT_LOADING,
        beers: data
    }
}

export const onLoadBeersABVGt = (data) => {
    return {
        type: actionTypes.GET_ABV_GT,
        beers: data
    }
}

export const onLoadOneBeer = (data) => {
    console.log(data);
    return {
        type: actionTypes.GET_ONE_BEER,
        beer: data
    }
}

export const fetchingBeersError = () => {
    return {
        type: actionTypes.FETCH_MODAL_BEERS_ERROR
    }
}

export const apiCallabvGt = (ibu) => {
    return dispatch => {
        dispatch(onLoadingBeersABVGt());
        let url = '/beers?abv_gt=' + ibu; 
        axios.get(url)
             .then(response => {
                 response.data.length === 0 ? null : dispatch(onLoadBeersABVGt(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}

export const getOneBeer = (id) => {
    return dispatch => {
        dispatch(onLoadingModal());
        let url = '/beers/' + id; 
        axios.get(url)
             .then(response => {
                 dispatch(onLoadOneBeer(response.data))              
             })
             .catch(error => {
                 dispatch(fetchingBeersError());
             })
    }
}