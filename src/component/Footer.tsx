import { v4 as uuid } from 'uuid';
import fetchExpenses from '../helper/fetchExpenses';
import Display from './Display';

function Footer() {
  const currentData = fetchExpenses();
  return (
    <div>
      <h1 className="text-lg text-center font-bold p-10 text-[#f353b2]">
        Expense List
      </h1>
      <div className="grid place-items-center pt-2 ">
        <div className="bg-[#2B70A7] rounded w-5/6 pb-10">
          <div className="grid grid-cols-4 gap-3 max-w-3xl m-auto pt-10 font-bold text-white">
            <div className="col-span-2">Category</div>
            <div>Expense</div>
            <div>Expense Details</div>
          </div>
        </div>

        <div className="bg-white rounded w-5/6 pb-10">
          {currentData?.map((values) => {
            return <Display key={uuid()} expenseList={values} />;
          }) || null}
        </div>
      </div>
    </div>
  );
}

export default Footer;
