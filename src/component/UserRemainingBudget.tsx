interface IProps {
  remainingBudget: number | string | null;
}

function UserBudgetHeader({ remainingBudget }: IProps) {
  return (
    <div>
      <h1 className="text-center text-lg py-4 font-bold text-[#011627]">
        {`Remaining Budget: $${remainingBudget}`}
      </h1>
    </div>
  );
}
export default UserBudgetHeader;
