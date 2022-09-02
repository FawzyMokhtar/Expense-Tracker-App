import { configureStore } from '@reduxjs/toolkit';

import { expensesReducer } from './reducers';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
