import React from 'react';
import PropTypes, { any } from 'prop-types';
import styled from 'styled-components';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BGCOLORS = {
  size: 'rgba(200, 0, 200, 0.3)',
  kcal: 'rgba(0, 150, 200, 0.3)',
  total_sugar: 'rgba(0, 50, 200, 0.3)',
  protein: 'rgba(150, 30, 10, 0.3)',
  fat: 'rgba(0, 0, 200, 0.3)',
  Cholesterol: 'rgba(0, 150, 200, 0.3)',
};

const getSummary = (foodInfo) =>
  !foodInfo
    ? {}
    : {
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

const FoodNutritionChart = ({ foodInfo }) => (
  <StyledChartContainer>
    <Bar
      data={getSummary(foodInfo)}
      options={{
        maintainAspectRatio: false,
      }}
    />
  </StyledChartContainer>
);

FoodNutritionChart.propTypes = {
  foodInfo: PropTypes.oneOfType([any]).isRequired,
};

const StyledChartContainer = styled.div`
  margin-bottom: 3.5rem;
  /* width: 100%; */
  height: 100%;
`;

export default FoodNutritionChart;
