interface IProps {
  remainingBudget: number | null;
}

function UserBudgetHeader({ remainingBudget }: IProps) {
  return (
    <div>
      <h1
        className={
          remainingBudget
            ? 'text-center text-lg py-4 font-bold text-[#011627]'
            : 'hidden'
        }
      >
        Remaining Budget:{' '}
        <span className="text-[#f353b2]">${remainingBudget}</span>
      </h1>
    </div>
  );
}
export default UserBudgetHeader;
