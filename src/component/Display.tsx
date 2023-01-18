interface ExpenseList {
  expenseList: {
    expense: number;
    description: string;
    category: string;
  };
  dailyBudget: number;
}

function Display({ expenseList, dailyBudget }: ExpenseList) {
  return (
    <div className="grid grid-cols-6 gap-3 max-w-3xl m-auto pt-10">
      <div className="col-span-2">{expenseList.category}</div>
      <div>{expenseList.expense}</div>
      <div className="col-span-2">{expenseList.description}</div>
      <div>{`You have $${
        dailyBudget - expenseList.expense
      } remaining on your budget`}</div>
    </div>
  );
}

export default Display;
