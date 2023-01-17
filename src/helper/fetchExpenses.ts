export interface Expense {
  dailyBudget: number;
  expense: number;
  description: string;
  category: string;
}
const fetchExpenses = () => {
  const nonParse = localStorage.getItem('userExpenses');
  if (nonParse) {
    const expenses: Expense[] = JSON.parse(nonParse) as Expense[];
    return expenses;
  }
  return null;
};

export default fetchExpenses;
