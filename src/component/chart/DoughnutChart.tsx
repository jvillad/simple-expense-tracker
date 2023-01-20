import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import { Expense } from '../../helper/fetchExpenses';

interface IChartProps {
  category: string;
  amount: number;
}

interface ITotals {
  category: string;
  amount: number;
}

interface IDataProps {
  chartData: Expense[];
}

function DoughnutChart({ chartData }: IDataProps) {
  const [totals, setTotals] = useState<ITotals[]>([]);
  const calculateTotals = (expenses: Expense[]) => {
    const newTotals = expenses.reduce(
      (acc: Record<string, number>, expense: Expense) => {
        if (acc[expense.category]) {
          acc[expense.category] += expense.expense;
        } else {
          acc[expense.category] = expense.expense;
        }

        return acc;
      },
      {}
    );

    const mappedExpenses = Object.entries(newTotals).map(([key, value]) => {
      return { category: key, amount: value };
    });

    return mappedExpenses;
  };

  useEffect(() => {
    if (chartData) {
      setTotals(calculateTotals(chartData));
    }
  }, [chartData]);

  // format chart.js requires {labels: , datasets: []}
  const [userData, setUserData] = useState({
    labels: totals.map((values: IChartProps) => values.category),
    datasets: [
      {
        label: 'User Expense',
        data: totals.map((values: IChartProps) => values.amount),
        hoverOffset: 8,
      },
    ],
  });

  useEffect(() => {
    if (totals) {
      setUserData({
        labels: totals.map((values: IChartProps) => values.category),
        datasets: [
          {
            label: 'User Expense',
            data: totals.map((values: IChartProps) => values.amount),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            backgroundColor: ['#2B70A7', '#BF1E2E', '#EF4136', '#F15A2B'],
            hoverOffset: 8,
          },
        ],
      });
    }
  }, [totals]);
  return (
    <div className="w-5/6  h-5/6 max-h-96">
      {chartData ? <Pie data={userData} /> : <p>Loading data...</p>}
    </div>
  );
}

export default DoughnutChart;
