import uuid from 'react-native-uuid';

export class Expense {
  constructor(description, value) {
    this.id = uuid.v4();
    this.description = description;
    this.value = value;
    this.createdAt = new Date(Date.now());
  }
}
