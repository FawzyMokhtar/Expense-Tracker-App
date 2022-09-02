import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

import { useDispatch } from 'react-redux';

import { ExpenseForm } from './ExpenseForm';
import { Colors } from '../../constants';
import { ExpensesActions } from '../../store';
import { ExpensesService } from '../../services';
import { ErrorOverlay, LoadingOverlay } from '../ui';

export function UpdateExpense({ visible, expense, onCancel }) {
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const formInitialValues = {
    description: expense.description,
    value: expense.value.toFixed(2),
  };

  async function saveHandler({ description, value }) {
    setIsSubmittingData(true);
    try {
      const updatedExpense = await ExpensesService.update(expense.id, {
        description,
        value,
      });

      dispatch(
        ExpensesActions.update({
          id: expense.id,
          ...updatedExpense,
        })
      );

      onCancel();
    } catch (error) {
      setError(`Couldn't update the expense.`);
    }

    setIsSubmittingData(false);
  }

  function deleteHandler() {
    Alert.alert('Confirmation', 'Do you want do delete this expense?', [
      { text: 'Yes', style: 'default', onPress: () => confirmDelete() },
      { text: 'No', style: 'destructive' },
    ]);
  }

  async function confirmDelete() {
    setIsSubmittingData(true);
    try {
      await ExpensesService.delete(expense.id);
      dispatch(ExpensesActions.delete({ id: expense.id }));
      onCancel();
    } catch (error) {
      setError(`Couldn't delete the expense.`);
    }
    setIsSubmittingData(false);
  }

  let content = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Update Expense</Text>
      </View>
      <ExpenseForm
        initialValues={formInitialValues}
        allowDelete={true}
        onSave={saveHandler}
        onCancel={onCancel}
        OnDelete={deleteHandler}
      />
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
