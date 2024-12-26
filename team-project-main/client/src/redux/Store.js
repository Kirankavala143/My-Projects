import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import recentActivityReducer from './recent';
import { AuthReducer } from './AuthSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth', 'recentActivity'],
};


const rootReducer = combineReducers({
  Auth: AuthReducer,
  recentActivity: recentActivityReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'],
      },
    }),
});


const persistor = persistStore(store);


export { store, persistor };
