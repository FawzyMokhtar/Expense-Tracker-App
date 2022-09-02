import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { useDispatch } from 'react-redux';

import { ExpenseForm } from './ExpenseForm';
import { Colors } from '../../constants';
import { ExpensesActions } from '../../store';
import { ExpensesService } from '../../services';
import { ErrorOverlay, LoadingOverlay } from '../ui';

export function CreateExpense({ visible, onCancel }) {
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  async function saveHandler(data) {
    setIsSubmittingData(true);
    try {
      const newExpense = await ExpensesService.create(data);
      dispatch(ExpensesActions.create(newExpense));
      onCancel();
    } catch (error) {
      setError(`Couldn't create the new expense.`);
    }
    setIsSubmittingData(false);
  }

  let content = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add Expense</Text>
      </View>
      <ExpenseForm onSave={saveHandler} onCancel={onCancel} />
    </View>
  );

  if (error && !isSubmittingData) {
    content = <ErrorOverlay message={error} onDismiss={() => setError(null)} />;
  } else if (isSubmittingData) {
    content = <LoadingOverlay />;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
    >
      {content}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary600,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: Colors.primary500,
    padding: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
