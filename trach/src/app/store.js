import { reducer } from '../reducers/mainReducer'
import { createStore, applyMiddleware, compose } from 'redux'
//import { getDefaultMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'trach:app',
  storage,
  whitelist: ['selectFilter'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const middlewares = getDefaultMiddleware({
//   immutableCheck: false,
//   serializableCheck: false,
//   thunk: true,
// });

const configureStore = () => {
  let store = createStore(
    persistedReducer,    
    composeEnhancers(
      applyMiddleware(thunkMiddleware)
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
export const { store, persistor } = configureStore()

export default store
