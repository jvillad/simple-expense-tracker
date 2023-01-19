import { Expense } from './fetchExpenses';

function setItem(storeKey: string, expenseList: Expense[]) {
  localStorage.setItem(storeKey, JSON.stringify(expenseList));
}

export default setItem;
