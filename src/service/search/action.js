import axios from "axios";
import URL from "../../asset/configUrl";
import actionType from "./actionType";

export const loadingSearch = () => dispatch => {
  dispatch({
    type: actionType.ENABLE_LOADING_SEARCH
  });
};
export const stopSearching = () => dispatch => {
  dispatch({
    type: actionType.DISABLE_LOADING_SEARCH
  });
};

export const searchHotelInit = (initPayload) => dispatch => {
  const { date, price,rating, bounds } = initPayload;
  const stayPeriod= {
    ...date
  };

  dispatch(loadingSearch());
  axios
    .post(URL.HOTEL_INIT, {
      stayPeriod,
      bounds,
      price,
      rating
    })
    .then(res => {
      setTimeout(() => dispatch(hotelSearchStatus(res.data.sessionId.sessionId, initPayload )), 1000)
      
      dispatch({
        type: actionType.SEARCH_HOTEL_INITIATION_SUCCESS,
        payload: res.data.sessionId
      });
    })
    .catch(err =>{
      dispatch({
        type: actionType.SEARCH_HOTEL_LIST_GET_FAILURE
      });
    })
};

export const hotelSearchStatus = (sessionId, initPayload) => dispatch => {
  axios
    .post(URL.HOTEL_STATUS, {
      sessionId
    })
    .then(res => {
      setTimeout(() => dispatch(hotelSearchResult(sessionId, initPayload)), 100);
      dispatch({
        type: actionType.SEARCH_HOTEL_STATUS_SUCCESS,
        payload: res.data.result
      });
    })
    .catch(err =>  console.log('err..', err))

};

export const hotelSearchResult = (sessionId, initPayload) => dispatch => {
  dispatch(loadingSearch())
  const { price, rating } = initPayload;

  axios
    .post(URL.HOTEL_RESULTS, 
      { 
        sessionId, 
        price,
        rating
      })
    .then(res => {
      res.data.status === 'success' 
        ? dispatch({
          type: actionType.SEARCH_HOTEL_LIST_GET_SUCCESS,
          payload: res.data.data 
        }): dispatch({
          type: actionType.SEARCH_HOTEL_LIST_GET_FAILURE,
        });
    })
    .catch(err => {
      dispatch({
        type: actionType.SEARCH_HOTEL_LIST_GET_FAILURE,
      });
    })
};

export const clearHotelList = () => dispatch => {
  dispatch({
    type: actionType.CLEAR_HOTEL_LIST_SUCCESS
  })
}
