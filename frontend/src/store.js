import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './saga/reducer/reducers';
import rootSaga from './saga/sagas/rootSaga';
import {persistStore} from "redux-persist";
import {composeWithDevTools} from 'redux-devtools-extension';
const logger = createLogger({
    collapsed: true,
});
const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'development') {
        return applyMiddleware(sagaMiddleware, logger);
    }
    return applyMiddleware(sagaMiddleware);
};
const initialState = {}
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(getMiddleware()),
);
sagaMiddleware.run(rootSaga);
export const persistorStorage = persistStore(store)