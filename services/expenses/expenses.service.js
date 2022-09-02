import axios from 'axios';

import { API } from '../../constants';

export class ExpensesService {
  static async loadAll() {
    const response = await axios.get(`${API.url}/expenses.json`);

    const expenses = [];

    for (const key in response.data) {
      expenses.push({
        id: key,
        description: response.data[key].description,
        value: response.data[key].value,
        createdAt: new Date(response.data[key].createdAt),
      });
    }

    return expenses;
  }

  static async create(data) {
    const newExpenseData = {
      ...data,
      createdAt: new Date(Date.now()),
    };

    const response = await axios.post(
      `${API.url}/expenses.json`,
      newExpenseData
    );

    const id = response.data.name;
    newExpenseData.id = id;

    return newExpenseData;
  }

  static async update(id, { description, value }) {
    const response = await axios.patch(`${API.url}/expenses/${id}.json`, {
      description,
      value,
    });

    return response.data;
  }

  static async delete(id) {
    await axios.delete(`${API.url}/expenses/${id}.json`);
  }
}
