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

// const BGCOLORS = {
//   size: 'rgba(200, 0, 200, 0.3)',
//   kcal: 'rgba(0, 150, 200, 0.3)',
//   carbohydrate: 'rgba(255, 0, 100, 0.3)',
//   total_sugar: 'rgba(0, 50, 200, 0.3)',
//   protein: 'rgba(150, 30, 10, 0.3)',
//   fat: 'rgba(0, 0, 200, 0.3)',
//   Cholesterol: 'rgba(0, 150, 200, 0.3)',
// };

const COLORS = {
  size: 'rgba(200, 0, 200, 0.6)',
  kcal: 'rgba(0, 150, 200, 0.6)',
  carbohydrate: 'rgba(255, 0, 100, 0.6)',
  total_sugar: 'rgba(0, 50, 200, 0.6)',
  protein: 'rgba(150, 30, 10, 0.6)',
  fat: 'rgba(0, 0, 200, 0.6)',
  Cholesterol: 'rgba(0, 150, 200, 0.6)',
};

// const getSummary = (foodInfo) => {

function getSummary(foodInfo){
  // const standard = {
  //   label: '1일 권장량(% Daily Values)',
  //   fill: true,
  //   data: [
  //     foodInfo.size, 100, 100, 100, 100, 100, 100, 100
  //   ],
  //   borderColor : 'rgba(0, 0, 0, 0)',
  //   borderWidth : 0,
  //   backgroundColor : [
  //     BGCOLORS.size,
  //     BGCOLORS.kcal,
  //     BGCOLORS.carbohydrate,
  //     BGCOLORS.total_sugar,
  //     BGCOLORS.protein,
  //     BGCOLORS.fat,
  //     BGCOLORS.Cholesterol,
  //   ], 
  // };

  const over100 = {
    label : "servings, energy",
    fill : true,
    data : [
      foodInfo.size, foodInfo.kcal, 0, 0, 0, 0, 0
    ],
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    backgroundColor: [
      COLORS.size,
      COLORS.kcal,
      COLORS.Cholesterol,
    ],
    yAxisID: 'over100'
  }

  const under100 = {
    label : "nutritions",
    data : [0, 0, foodInfo.carbohydrate, foodInfo.total_sugar, foodInfo.protein, foodInfo.fat, foodInfo.Cholesterol],
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    backgroundColor: [
      COLORS.carbohydrate,
      COLORS.total_sugar,
      COLORS.protein,
      COLORS.fat,
    ],
    yAxisID : 'under100'
  }
  
  // const foodData = {
  //   label: foodInfo.name,
  //   fill: true,
  //   data: [
  //     foodInfo.size,
  //     Math.round(( foodInfo.kcal / 2500 ) * 100 ),
  //     Math.round(( foodInfo.carbohydrate / (2500*0.60) ) * 100),
  //     Math.round(( foodInfo.total_sugar / (2500*0.05) ) * 100),
  //     Math.round(( foodInfo.protein / (2500*0.25) ) * 100),
  //     Math.round(( foodInfo.fat / (2500*0.15) ) * 100),
  //     Math.round(( foodInfo.Cholesterol / 300 ) * 100),
  //   ],
  //   borderColor: 'rgba(0, 0, 0, 0)',
  //   borderWidth: 1,
  //   backgroundColor: [
  //     COLORS.size,
  //     COLORS.kcal,
  //     COLORS.carbohydrate,
  //     COLORS.total_sugar,
  //     COLORS.protein,
  //     COLORS.fat,
  //     COLORS.Cholesterol,
  //   ],
  //   hoverBackgroundColor: 'rgba(0, 0, 200, 0.1)',
  //   hoverBorderColor: 'rgba(0, 50, 50, 0.2)',
  // };

  // console.log(foodData.data);
  console.log(foodInfo.carbohydrate, foodInfo.total_sugar, foodInfo.protein, foodInfo.fat, foodInfo.Cholesterol)

  return !foodInfo
    ? {}
    : {
        labels: [
          'Servings(g)',
          'Energy(kcal)',
          'Carbohydrate(g)',
          'Total_sugar(g)',
          'Protein(g)',
          'Fat(g)',
          'Cholesterol(mg)', 
        ],
        datasets: [over100, under100]
      };
};

const FoodNutritionChart = ({ foodInfo }) => (
  <StyledChartContainer>
    <Bar
      data={getSummary(foodInfo)}
      options={{
        maintainAspectRatio: false,
        responsive: false,
        tooltip: {
          mode: 'index',
          intersect: true,
        },
        yAxes: [{
          id: 'over100'
        }, {
          id: 'under100'
        }]
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
