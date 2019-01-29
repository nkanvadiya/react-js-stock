import Immutable  from 'immutable';
import ActionsTypes from '../../constants/actionsType';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  ticker: [],
  history: []
});

const getuniquestock = ( arr ) => { 
  let output = [];
  _.chain(arr).map( o => {
      output.push( arr[ _.findLastKey(arr, ['name', o.name]) ] );
  }).value()

  //sorting 
  output.sort(function(a, b){
    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
    if (nameA < nameB) //sort string ascending
        return -1 
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
  });

  return _.uniq(output, 'name');
};

export default function tickerReducer(state = initialState, action) {
  switch (action.type) {
    case ActionsTypes.FETCH_TICKER:
      return state;
    case ActionsTypes.FETCH_TICKER_FULFILLED:      
      let ticker = getuniquestock( state.get('ticker').merge( Immutable.fromJS( action.payload ) ).toJS() );    
      return state.set('ticker',  Immutable.fromJS(  ticker ) )
       .set('history', state.get('history').push( Immutable.fromJS( ticker ) ) );
    default:
      return state;
  }
}
