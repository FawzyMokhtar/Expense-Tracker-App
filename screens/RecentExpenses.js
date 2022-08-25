import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { ExpensesList } from '../components';
import { Colors } from '../constants';
import { ExpensesSelectors } from '../store';

function isWithinSevenDays(date) {
  return moment(date).isAfter(moment().subtract(7, 'days'));
}

export function RecentExpenses() {
  const expenses = useSelector(ExpensesSelectors.getExpenses).filter(
    (expense) => isWithinSevenDays(expense.createdAt)
  );

  const expensesTotal = expenses
    .map((expense) => expense.value)
    .reduce((previous, current) => previous + current, 0);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryLabel}>Last 7 Days</Text>
        <NumberFormat
          value={expensesTotal}
          displayType='text'
          prefix='$'
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          renderText={(value) => <Text style={styles.valueText}>{value}</Text>}
        />
      </View>
      <View>
        <ExpensesList expenses={expenses} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginBottom: 64,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.secondary500,
    marginBottom: 16,
    padding: 16,
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.primary500,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary500,
  },
});
