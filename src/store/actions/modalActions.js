import * as actionTypes from './actionTypes';
import axios from '../../axios-instances';


export const onLoadingModal = () => {
    return {
        type: actionTypes.ON_LOADING_MODAL
    }
}

export const onLoadingBeers = (data) => {
    return {
        type: actionTypes.GET_MODAL_BEERS_LOADING,
        beers: data
    }
}

export const onLoadBeers = (data, measuredBy) => {
    switch(measuredBy) {
        case 'abv_gt':
            return {
                type: actionTypes.GET_MODAL_BEERS_ABV,
                beers: data
            }
        default:
            return {
                type: actionTypes.GET_MODAL_BEERS_IBU,
                beers: data
            }
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

export const apiCallModalBeers = (measuredBy, url_param) => {
    return dispatch => {
        dispatch(onLoadingBeers());
        let url = '/beers?' + url_param + '=' + measuredBy; 
        axios.get(url)
             .then(response => {
                 dispatch(onLoadBeers(response.data, url_param))              
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