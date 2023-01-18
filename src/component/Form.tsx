import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import fetchExpenses from '../helper/fetchExpenses';
import Display from './Display';

function Form() {
  const [maxBudget, setMaxBudget] = useState<number>();
  const [isVisible, setIsVisible] = useState(true);

  const currentData = fetchExpenses();
  useEffect(() => {
    if (currentData) {
      setMaxBudget(currentData[0].dailyBudget);
      setIsVisible(false);
    }
  }, [currentData]);

  // formik initial values
  const formik = useFormik({
    initialValues: {
      dailyBudget: 0,
      isVisible,
      expense: 0,
      description: '',
      category: '',
    },

    // form validation
    validationSchema: Yup.object({
      // TODO: Daily Budget Input Validation
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
        localStorage.setItem(
          'userExpenses',
          JSON.stringify([...data, userInput])
        );
      } else {
        localStorage.setItem('userExpenses', JSON.stringify([userInput]));
        setMaxBudget(userInput.dailyBudget);
      }
      formik.resetForm();
    },
  });
  return (
    <main>
      <h1 className="text-lg text-center font-bold p-10 text-[#f353b2]">
        Daily Expense Tracker 👋🏼
      </h1>
      <div className="flex items-center justify-center">
        <form
          className="bg-white flex rounded-lg w-2/6"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex-1 text-gray-700 p-20  grid place-items-center">
            {/* Daily Budget Input */}
            {!maxBudget ? (
              <div className="pb-3">
                <label className="block text-sm p-1" htmlFor="dailyBudget">
                  Daily Budget
                </label>
                <input
                  className="border-2 border-gray-400 p-1 rounded-md w-60 focus:border-teal-400"
                  type="number"
                  name="dailyBudget"
                  placeholder="Enter budget here"
                  value={!maxBudget ? formik.values.dailyBudget : maxBudget}
                  onChange={formik.handleChange}
                  onFocus={() => {
                    if (formik.values.dailyBudget === 0) {
                      formik.setFieldValue('dailyBudget', '');
                    }
                  }}
                />
              </div>
            ) : (
              // TODO: New component for daily budget
              <div>
                <h1 className="text-center text-lg font-bold py-2 text-[#011627]">
                  {`Budget for today is: $${maxBudget}`}
                </h1>
              </div>
            )}
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
          </div>
        </form>
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
