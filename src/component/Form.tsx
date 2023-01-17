import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import fetchExpenses from '../helper/fetchExpenses';
import Display from './Display';

function Form() {
  const [maxBudget, setMaxBudget] = useState<number>();

  const currentData = fetchExpenses();
  useEffect(() => {
    if (currentData) setMaxBudget(currentData[0].dailyBudget);
  }, [currentData]);

  // formik initial values
  const formik = useFormik({
    initialValues: {
      dailyBudget: 0,
      expense: 0,
      description: '',
      category: '',
    },

    // form validation

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
      <form onSubmit={formik.handleSubmit}>
        {/* Daily Budget Input */}
        {!maxBudget ? (
          <div>
            <label htmlFor="dailyBudget">
              Daily Budget
              <input
                type="number"
                name="dailyBudget"
                placeholder="Enter budget here"
                value={formik.values.dailyBudget}
                onChange={formik.handleChange}
              />
            </label>
          </div>
        ) : (
          <h1>{maxBudget}</h1>
        )}
        {/* Expense Amount */}
        <div>
          <label htmlFor="expense">
            Expense Amount
            <input
              type="number"
              name="expense"
              placeholder="expense here"
              value={formik.values.expense}
              onChange={formik.handleChange}
            />
          </label>
        </div>
        {/* Description Amount */}
        <div>
          <label htmlFor="description">
            Description
            <input
              type="text"
              name="description"
              placeholder="expense details"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </label>
        </div>
        {/* Expense Category */}
        <div>
          <label htmlFor="category">
            Select Category
            <select
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
          </label>
        </div>
        <button type="submit">Add Expense</button>
      </form>
      {currentData?.map((values) => {
        return <Display key={uuid()} expenseList={values} />;
      })}
    </main>
  );
}

export default Form;
