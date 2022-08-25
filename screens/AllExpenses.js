import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import { ExpensesList } from '../components';
import { ExpensesSelectors } from '../store';

export function AllExpenses() {
  const expenses = useSelector(ExpensesSelectors.getExpenses);

  return (
    <View style={styles.container}>
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
