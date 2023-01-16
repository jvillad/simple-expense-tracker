function Form() {
  return (
    <main>
      <form action="">
        {/* Daily Budget Input */}
        <div>
          <label htmlFor="daily-budget">
            Daily Budget
            <input
              type="number"
              name="daily-budget"
              placeholder="Enter budget here"
            />
          </label>
        </div>
        {/* Expense Amount */}
        <div>
          <label htmlFor="expense">
            Expense Amount
            <input type="number" name="expense" placeholder="expense here" />
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
            />
          </label>
        </div>
        {/* Expense Category */}
        <div>
          <label htmlFor="category">
            Select Category
            <select name="category">
              <option value="Food">Food and Grocery</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Transportation">Transportation</option>
              <option value="Misc">Misc</option>
            </select>
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </main>
  );
}

export default Form;
