import { combineEpics } from 'redux-observable';
import { fetchTickerEpic } from "./ticker";

export const rootEpic = combineEpics(
    fetchTickerEpic
);
