import actionTypes from './actionType';

const initialState = {
  sessionId: null,
  supplierList: null,
  hotelCount: null,
  result: null,
  hotelList: null,
  isSearching: false,
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_HOTEL_INITIATION_SUCCESS:
      return ({
        ...state,
        sessionId: action.payload.sessionId
      });
    case actionTypes.SEARCH_HOTEL_STATUS_SUCCESS:
      return ({
        ...state,
        supplierList: action.payload.completedSuppliers,
        hotelCount: action.payload.hotelCount
      });
    case actionTypes.CLEAR_HOTEL_LIST_SUCCESS:
      return ({
        ...state,
        hotelList: []
      });
    case actionTypes.SEARCH_HOTEL_LIST_GET_FAILURE:
      return ({
        ...state,
        hotelList: [],
        isSearching: false
      });
    case actionTypes.SEARCH_HOTEL_LIST_GET_SUCCESS:
      return ({
        ...state,
        hotelList: action.payload.hotels,
        isSearching: false
      });
    case actionTypes.ENABLE_LOADING_SEARCH:
      return({
        ...state,
        isSearching: true
      });
    case actionTypes.DISABLE_LOADING_SEARCH:
      return({
        ...state,
        isSearching: false
      });
    default: 
      return state;
  }
}
export default reducer;