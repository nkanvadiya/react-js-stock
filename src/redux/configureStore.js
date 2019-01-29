import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers/index';

const loggerMiddleware = createLogger({ diff: true,
    predicate: () => process.env.NODE_ENV === 'development',
    collapsed: true
});

const store = createStore(rootReducer,   
    applyMiddleware(loggerMiddleware )
);

export default store;
