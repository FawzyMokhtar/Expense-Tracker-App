import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    data: [],
  },
  reducers: {
    load: (state, action) => {
      state.data = [...action.payload.reverse()];
    },
    create: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    update: (state, action) => {
      const { id, description, value } = action.payload;
      const expenseIndex = state.data.findIndex((expense) => expense.id === id);

      if (expenseIndex !== -1) {
        const expense = state.data[expenseIndex];
        state.data[expenseIndex] = {
          ...expense,
          description,
          value,
        };
      }
    },
    delete: (state, action) => {
      const id = action.payload.id;
      const expenseIndex = state.data.findIndex((expense) => expense.id === id);

      if (expenseIndex !== -1) {
        state.data.splice(expenseIndex, 1);
      }
    },
  },
});

export const ExpensesActions = {
  ...expensesSlice.actions,
};

export default expensesSlice.reducer;
