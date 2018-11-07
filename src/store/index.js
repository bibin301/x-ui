import { combineReducers } from 'redux'
import searchReducer from '../service/search/reducer';

const rootReducer = combineReducers({
  searchReducer
});

export default rootReducer;