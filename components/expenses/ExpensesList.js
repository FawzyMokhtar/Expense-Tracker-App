import { FlatList } from 'react-native';

import { ExpenseItem } from './ExpenseItem';

export function ExpensesList({ expenses }) {
  function renderExpenseItem(expense) {
    return <ExpenseItem expense={expense} />;
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={(itemData) => renderExpenseItem(itemData.item)}
    />
  );
}
