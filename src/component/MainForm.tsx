import { useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import 'chart.js/auto';
import fetchExpenses from '../helper/fetchExpenses';
import setItem from '../helper/setItem';
import DailyBudgetForm from './DailyBudgetForm';
import UserBudgetHeader from './UserBudgetHeader';
import UserRemainingBudget from './UserRemainingBudget';

import DoughnutChart from './chart/DoughnutChart';

function Form() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number>();

  // get the data
  const budget = localStorage.getItem('userMaxBudget');

  if (maxBudget) {
    // set maxbudget to local storage
    localStorage.setItem('userMaxBudget', JSON.stringify(maxBudget));
    // set the remaining budget in local storage - expense
    localStorage.setItem('userRemaining', JSON.stringify(maxBudget));
    // reset the state
    setMaxBudget(undefined);
  }

  const currentData = fetchExpenses();

  // formik initial values
  const formik = useFormik({
    initialValues: {
      expense: 0,
      description: '',
      category: '',
    },

    // form validation
    validationSchema: Yup.object({
      expense: Yup.number()
        .max(1000000, 'Exceed daily expense')
        .min(1, 'Expense must be greater than 1')
        .required('Expense is required'),
      category: Yup.string().required('Please select a category'),
    }),

    // on submit form
    onSubmit: (userInput) => {
      const prevBal = localStorage.getItem('userRemaining');
      if (prevBal) {
        const currentBal = JSON.parse(prevBal) - userInput.expense;
        localStorage.setItem('userRemaining', JSON.stringify(currentBal));
      }
      const data = fetchExpenses();
      if (data) {
        setItem('userExpenses', [...data, userInput]);
      } else {
        setItem('userExpenses', [userInput]);
      }
      formik.resetForm();
    },
  });
  return (
    <main className="">
      <div className="grid place-items-center">
        <div className="grid grid-cols-2 w-5/6">
          <div className="grid place-items-center">
            <div className="bg-white rounded-lg w-3/6">
              <UserBudgetHeader
                userDailyBudget={budget ? JSON.parse(budget) : 0}
              />
              <UserRemainingBudget
                remainingBudget={
                  localStorage.getItem('userRemaining')
                    ? localStorage.getItem('userRemaining')
                    : '0'
                }
              />
              <div className="text-gray-700 py-5 pb-10 grid place-items-center">
                {!showForm ? (
                  <DailyBudgetForm
                    setShowForm={setShowForm}
                    setMaxBudget={setMaxBudget}
                  />
                ) : (
                  <form onSubmit={formik.handleSubmit}>
                    {/* Expense Amount */}
                    <div className="pb-3">
                      <label className="block text-sm p-1 " htmlFor="expense">
                        Expense Amount
                      </label>
                      <input
                        className="border-2 border-gray-400 p-1 rounded-md w-60 focus:border-teal-400"
                        type="number"
                        name="expense"
                        placeholder="expense here"
                        value={formik.values.expense}
                        onChange={formik.handleChange}
                        onFocus={() => {
                          if (formik.values.expense === 0) {
                            formik.setFieldValue('expense', '');
                          }
                        }}
                      />
                    </div>
                    {/* Description Amount */}
                    <div className="pb-3">
                      <label
                        className="block text-sm p-1"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <input
                        className="border-2 border-gray-400 p-1 rounded-md w-60 focus:border-teal-400"
                        type="text"
                        name="description"
                        placeholder="expense details"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                      />
                    </div>
                    {/* Expense Category */}
                    <div>
                      <label className="block text-sm p-1" htmlFor="category">
                        Select Category
                      </label>
                      <select
                        className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-teal-400 p-2"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Food">Food and Grocery</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Misc">Misc</option>
                      </select>
                    </div>
                    <button
                      className="py-3 mt-6 rounded-lg w-full text-sm bg-[#2babe7] text-white"
                      type="submit"
                    >
                      Add Expense
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="grid place-items-center">
            {currentData ? (
              <DoughnutChart chartData={currentData} />
            ) : (
              <div className="text-center">
                <p>No data available for chart</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Form;
