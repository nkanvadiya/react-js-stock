import Immutable  from 'immutable';
import ActionsTypes from '../../constants/actionsType';

const initialState = Immutable.fromJS({
  ticker: {},
  history: []
});

export default function tickerReducer(state = initialState, action) {
  switch (action.type) {
    case ActionsTypes.FETCH_TICKER:
      return state;
    case ActionsTypes.FETCH_TICKER_FULFILLED:      
      return state.set('ticker',Immutable.fromJS(action.payload))
       .set('history', state.get('history').merge( Immutable.fromJS(action.payload) ) );
    default:
      return state;
  }
}