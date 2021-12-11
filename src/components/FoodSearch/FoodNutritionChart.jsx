import React from 'react';
import styled from 'styled-components';
import PropTypes, { any } from 'prop-types';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

function getSummary(foodInfo) {
  console.log(foodInfo);
  const foodData = [
    {
      name: 'Energy',
      percent: Math.round((foodInfo.kcal / 2000) * 100),
    },
    {
      name: 'Carbohydrate',
      percent: Math.round((foodInfo.carbohydrate / 324) * 100),
    },
    {
      name: 'Protein',
      percent: Math.round((foodInfo.protein / 55) * 100),
    },
    {
      name: 'Fat',
      percent: Math.round((foodInfo.fat / 54) * 100),
    },
    {
      name: 'Sugar',
      percent: Math.round((foodInfo.total_sugar / 100) * 100),
    },
    {
      name: 'Na',
      percent: Math.round((foodInfo.Na / 2000) * 100),
    },
    {
      name: 'Cholesterol',
      percent: Math.round((foodInfo.Cholesterol / 300) * 100),
    },
  ];

  return !foodInfo ? {} : foodData;
}

const FoodNutritionChart = ({ foodInfo }) => {
  const data = getSummary(foodInfo);

  return (
    <ChartSection>
      <Legend>1일 영양 성분 기준치에 대한 비율(%)</Legend>
      <ChartSize>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            data={data}
            margin={{
              top: 10,
              right: 30,
              bottom: 10,
              left: 50,
            }}
            fontSize="0.8rem"
          >
            <CartesianGrid stroke="#f3f3f3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Bar dataKey="percent" barSize={20} fill="#72AF2C">
              <LabelList dataKey="percent" position="right" fontWeight={600} />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </ChartSize>
      <Caution>
        * 1일 영양성분 기준치에 대한 비율(%)은 2,000kcal 기준이므로 개인의 필요
        열량에 따라 다를 수 있습니다.
      </Caution>
    </ChartSection>
  );
};

FoodNutritionChart.propTypes = {
  foodInfo: PropTypes.oneOfType([any]).isRequired,
};

const ChartSection = styled.section``;

const Legend = styled.h2`
  text-align: center;
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
`;

const ChartSize = styled.div`
  width: 36vw;
  height: 30vw;
  max-width: 480px;
  max-height: 350px;
`;

const Caution = styled.p`
  font-size: 0.65rem;
  font-weight: 300;
  text-align: center;
`;

export default FoodNutritionChart;
