import { useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import fetchExpenses from '../helper/fetchExpenses';
import Display from './Display';
import setItem from '../helper/setItem';
import DailyBudgetForm from './DailyBudgetForm';

function Form() {
  const [showForm, setShowForm] = useState<boolean>(false);
  let budget = localStorage.getItem('userMaxBudget');
  if (budget) {
    budget = JSON.parse(budget);
  }

  const currentData = fetchExpenses();
  // formik initial values
  const formik = useFormik({
    initialValues: {
      dailyBudget: 0,
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
    <main>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg w-2/6">
          <div className="flex-1 text-gray-700 p-20  grid place-items-center">
            {!showForm ? (
              <DailyBudgetForm setShowForm={setShowForm} />
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
                  <label className="block text-sm p-1" htmlFor="description">
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
      {currentData?.map((values) => {
        return (
          <Display
            key={uuid()}
            expenseList={values}
            dailyBudget={currentData[0].dailyBudget}
          />
        );
      })}
    </main>
  );
}

export default Form;
