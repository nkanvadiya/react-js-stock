import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ActionsTypes from '../../constants/actionsType';
import { webSocket } from 'rxjs/webSocket'; 
import { map } from 'rxjs/operators';
import _ from 'lodash';

let socket$ = webSocket("ws://stocks.mnet.website");

export const fetchTicker = () => ({ type: ActionsTypes.FETCH_TICKER });
export const fetchTickerFulfilled = payload => ({ type: ActionsTypes.FETCH_TICKER_FULFILLED, payload });

const convertToReadableObject = ( arr ) => {
    return _.chain(arr).map( o => { return { 'name' : o[0], 'value' : o[1], 'time' : Date.now() } }).value();
};

// epic
export const fetchTickerEpic = action$ => action$.pipe(
    ofType(ActionsTypes.FETCH_TICKER),
    mergeMap(action =>
        socket$.pipe( map( response => fetchTickerFulfilled( convertToReadableObject( response ) ) ) )
    )
  );

