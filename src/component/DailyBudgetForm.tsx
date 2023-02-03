import { useFormik } from 'formik';
import { useEffect, Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

interface IProps {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setMaxBudget: (value: number) => void;
}

function DailyBudgetForm({ setShowForm, setMaxBudget }: IProps) {
  const checkStoredBudget = localStorage.getItem('userMaxBudget');
  useEffect(() => {
    if (checkStoredBudget) setShowForm(true);
  });

  // formik initial values
  const formik = useFormik({
    initialValues: {
      dailyBudget: 0,
    },

    // form validation
    validationSchema: Yup.object({
      // TODO: Daily Budget Input Validation
    }),

    // on submit form
    onSubmit: (inputValues) => {
      setShowForm(true);
      setMaxBudget(inputValues.dailyBudget);
    },
  });

  return (
    <div>
      {!checkStoredBudget && (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              className="block text-lg p-2 font-bold text-center text-[#f353b2]"
              htmlFor="dailyBudget"
            >
              Daily Budget
            </label>
            <input
              className="border-2 border-gray-400 p-2 rounded-md w-60 focus:border-teal-400"
              type="number"
              name="dailyBudget"
              placeholder="Enter budget here"
              value={formik.values.dailyBudget}
              onChange={formik.handleChange}
              onFocus={() => {
                if (formik.values.dailyBudget === 0) {
                  formik.setFieldValue('dailyBudget', '');
                }
              }}
            />
          </div>
          <button
            className="py-3 mt-6 rounded-lg w-full text-sm bg-[#2babe7] text-white"
            type="submit"
          >
            Set Budget
          </button>
        </form>
      )}
    </div>
  );
}

export default DailyBudgetForm;
