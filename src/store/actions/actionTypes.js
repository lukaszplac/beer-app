//action types for beer part of store
export const SET_FIRST_BEERS = 'SET_FIRST_BEERS';
export const SET_MORE_BEERS = 'SET_MORE_BEERS';
export const FETCHING_ERROR = 'FETCHING_ERROR';
export const ON_LOADING = "ON_LOADING";
export const FETCHING_DONE = "FETCHING_DONE";
export const GET_BY_IDS = "GET_BY_IDS";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REM_FAVORITE = "REM_FAVORITE";
export const DELETE_ALL = "DELETE_ALL";
export const REFRESH_FAVS_IN_STORE = "REFRESH_FAVS_IN_STORE";
export const FAV_FULL = "FAV_FULL";

//action types for modal part of store
export const GET_MODAL_BEERS_ABV = 'GET_MODAL_BEERS_ABV';
export const GET_MODAL_BEERS_IBU = 'GET_MODAL_BEERS_IBU';
export const GET_MODAL_BEERS_LOADING = 'GET_MODAL_BEERS_LOADING';
export const ON_LOADING_MODAL = 'ON_LOADING_MODAL';
export const FETCH_MODAL_BEERS_ERROR = 'FETCH_MODAL_BEERS_ERROR';
export const GET_ONE_BEER = 'GET_ONE_BEER';

//favorites DB action types
export const ADD_FAVORITE_DB = "ADD_FAVORITE_DB";
export const REM_FAVORITE_DB = "REM_FAVORITE_DB";
export const GET_FAVORITES_DB = "GET_FAVORITES_DB";
export const DELETE_ALL_DB = "DELETE_ALL_DB";
export const ON_DB_ERROR = "ON_DB_ERROR";
export const ON_PROCESSING = "ON_PROCESSING";
export const ADDING_IN_PROGRESS = "ADDING_IN_PROGRESS";
export const REMOVING_IN_PROGRESS = "REMOVING_IN_PROGRESS";