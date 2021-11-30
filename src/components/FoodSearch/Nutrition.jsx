import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Nutrition({ foodInfo }) {
  const detail = Object.entries(foodInfo).map((key) => ({
    items: key[0],
    values: key[1],
  }));

  const columns = [
    { title: 'Items', field: 'items' },
    { title: 'Values', field: 'values' },
  ];

  const BGCOLORS = {
    size: 'rgba(200, 0, 200, 0.3)',
    kcal: 'rgba(0, 150, 200, 0.3)',
    total_sugar: 'rgba(0, 50, 200, 0.3)',
    protein: 'rgba(150, 30, 10, 0.3)',
    fat: 'rgba(0, 0, 200, 0.3)',
    Cholesterol: 'rgba(0, 150, 200, 0.3)',
  };

  const summary = {
    labels: [
      'size(?)',
      'Energy(kcal)',
      'carbohydrate(g)',
      'total_sugar(g)',
      'protein(g)',
      'fat(g)',
      'Cholesterol(mg)',
    ],

    datasets: [
      {
        label: foodInfo.name,
        fill: true,
        data: [
          foodInfo.size,
          foodInfo.kcal,
          foodInfo.carbohydrate,
          foodInfo.total_sugar,
          foodInfo.protein,
          foodInfo.fat,
          foodInfo.Cholesterol,
        ],
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 1,
        backgroundColor: [
          BGCOLORS.size,
          BGCOLORS.kcal,
          BGCOLORS.carbohydrate,
          BGCOLORS.total_sugar,
          BGCOLORS.protein,
          BGCOLORS.fat,
          BGCOLORS.Cholesterol,
        ],
        hoverBackgroundColor: 'rgba(0, 0, 200, 0.1)',
        hoverBorderColor: 'rgba(0, 50, 50, 0.2)',
        options: {
          responsive: false,
          maintainAspectRatio: true,
          tooltip: {
            mode: 'index',
            intersect: true,
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="bar-chart-container">
        <Bar
          data={summary}
          width={300}
          height={200}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div id="material-table-container">
        <MaterialTable
          title="Detail Information"
          columns={columns}
          data={detail}
          options={{
            search: true,
            sorting: true,
          }}
        />
      </div>
    </div>
  );
}

Nutrition.propTypes = {
  foodInfo: PropTypes.objectOf.isRequired,
};

export default Nutrition;
