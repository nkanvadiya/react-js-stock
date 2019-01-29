import { combineReducers } from 'redux-immutable';
import tickerReducers from "./tickerReducers";

export const rootReducer = combineReducers({
    tickerReducers
});