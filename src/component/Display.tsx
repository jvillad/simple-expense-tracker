interface ExpenseList {
  expenseList: {
    expense: number;
    description: string;
    category: string;
  };
}

function Display({ expenseList }: ExpenseList) {
  return (
    <div className="grid grid-cols-4 gap-3 max-w-3xl m-auto pt-10">
      <div className="col-span-2">{expenseList.category}</div>
      <div>{expenseList.expense}</div>
      <div>{expenseList.description}</div>
    </div>
  );
}

export default Display;
