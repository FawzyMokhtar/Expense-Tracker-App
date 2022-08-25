import { createSlice } from '@reduxjs/toolkit';

import { EXPENSES } from '../../../data';
import { Expense } from '../../../models';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    data: EXPENSES,
  },
  reducers: {
    create: (state, action) => {
      const { description, value } = action.payload;
      const expense = new Expense(description, value);

      state.data = [expense, ...state.data];
    },
    update: (state, action) => {
      const { id, description, value } = action.payload;
      const expense = state.data.find((expense) => expense.id === id);

      if (expense) {
        expense = {
          ...expense,
          description,
          value,
        };
      }
    },
    delete: (state, action) => {
      const id = action.payload.id;
      const expenseIndex = state.data.indexOf((expense) => expense.id === id);

      if (expenseIndex !== -1) {
        state.data.splice(expenseIndex, 1);
      }
    },
  },
});

export const ExpensesActions = {
  create: expensesSlice.actions.create,
  update: expensesSlice.actions.update,
  delete: expensesSlice.actions.delete,
};

export default expensesSlice.reducer;
