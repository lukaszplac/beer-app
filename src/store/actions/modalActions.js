import * as actionTypes from './actionTypes';
import axios from '../../axios-instances';


export const onLoadingModal = () => {
    return {
        type: actionTypes.ON_LOADING_MODAL
    }
}

export const onLoadBeersIBUGt = (data) => {
    return {
        type: actionTypes.GET_IBU_GT,
        beers: data
    }
}

export const onLoadOneBeer = (data) => {
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

export const apiCallIbuGt = (ibu) => {
    return dispatch => {
        dispatch(onLoadingModal());
        let url = '/beers?ibu_gt=' + ibu; 
        axios.get(url)
             .then(response => {
                 response.data.length === 0 ? null : dispatch(onLoadBeersIBUGt(response.data))              
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