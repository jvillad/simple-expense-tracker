interface Props {
  expenseList: { expense: number; description: string; category: string };
}

function Display({ expenseList }: Props) {
  return (
    <div>
      {expenseList.expense}
      {expenseList.category}
    </div>
  );
}

export default Display;
