import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { ErrorOverlay, ExpensesList, LoadingOverlay } from '../components';
import { Colors } from '../constants';
import { ExpensesActions, ExpensesSelectors } from '../store';
import { ExpensesService } from '../services';

function isWithinSevenDays(date) {
  return moment(date).isAfter(moment().subtract(7, 'days'));
}

export function RecentExpenses() {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetchingData(true);

      try {
        const data = await ExpensesService.loadAll();
        dispatch(ExpensesActions.load(data));
      } catch (error) {
        setError(`Couldn't load expenses.`);
      }

      setIsFetchingData(false);
    }

    getExpenses();
  }, []);

  const expenses = useSelector(ExpensesSelectors.getExpenses).filter(
    (expense) => isWithinSevenDays(expense.createdAt)
  );

  const expensesTotal = expenses
    .map((expense) => expense.value)
    .reduce((previous, current) => previous + current, 0);

  if (error && !isFetchingData) {
    return <ErrorOverlay message={error} onDismiss={() => setError(null)} />;
  } else if (isFetchingData) {
    return <LoadingOverlay />;
  }

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
