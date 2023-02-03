interface MaxBudget {
  userDailyBudget: number;
}

function UserBudgetHeader({ userDailyBudget }: MaxBudget) {
  return (
    <div>
      <h1
        className={
          userDailyBudget
            ? 'text-center text-lg py-4 font-bold text-[#011627]'
            : 'hidden'
        }
      >
        {`Daily Budget: $${userDailyBudget}`}
      </h1>
    </div>
  );
}
export default UserBudgetHeader;
