import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import cardsReducer from './slices/cardsSlice';
import { Platform } from 'react-native';

const getStorage = Platform.select({
  default: () => require('@react-native-community/async-storage').default,
  web: () => require('redux-persist/lib/storage').default,
});

const rootReducer = combineReducers({
  cards: cardsReducer,
});

const persistConfig = {
  key: 'root',
  storage: getStorage(),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    // RTK add a serializable check which redux-persist violates
    // meh, ignore it https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};
