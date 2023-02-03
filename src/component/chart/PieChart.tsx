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

function PieChart({ chartData }: IDataProps) {
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
            // TODO:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            hoverOffset: 2,
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

export default PieChart;
