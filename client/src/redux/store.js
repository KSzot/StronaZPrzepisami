import Auth from "./reducers/auth.reducer";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const recuderRoot = combineReducers({
  Auth,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, recuderRoot);

const loggerMiddleware = createLogger();

const middleware = [thunk];

let composeEnhancers = compose;

if (process.env.NODE_ENV === "development") {
  middleware.push(loggerMiddleware);
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
