import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './middleware/index';
import { rootReducer } from './reducers/index';

const loggerMiddleware = createLogger({ diff: true,
    predicate: () => process.env.NODE_ENV !== 'development',
    collapsed: true
});

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer,   
    applyMiddleware(epicMiddleware, loggerMiddleware )
);

epicMiddleware.run(rootEpic);

export default store;
