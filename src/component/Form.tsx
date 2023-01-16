import { useFormik } from 'formik';

function Form() {
  const expenses: {
    dailyBudget: number;
    expense: number;
    description: string;
    category: string;
  }[] = [];

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
      const nonParsed = localStorage.getItem('userExpenses');
      if (nonParsed !== null) {
        const oldData: string = JSON.parse(nonParsed);
        expenses.push(userInput);
        localStorage.setItem(
          'userExpenses',
          JSON.stringify([...oldData, expenses])
        );
      }
    },
  });

  return (
    <main>
      <form onSubmit={formik.handleSubmit}>
        {/* Daily Budget Input */}
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
    </main>
  );
}

export default Form;
