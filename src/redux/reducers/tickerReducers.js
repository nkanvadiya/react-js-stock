import Immutable  from 'immutable';
import ActionsTypes from '../../constants/actionsType';

export default function tickerReducer(state = Immutable.List(), action) {
  switch (action.type) {
    default:
      return state;
  }
}