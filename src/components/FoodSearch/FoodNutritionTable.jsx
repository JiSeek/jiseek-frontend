import React, { useMemo } from 'react';
import PropTypes, { any } from 'prop-types';
import styled from 'styled-components';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiStrictModeTheme,
} from '@material-ui/core/styles';
import MaterialTable from 'material-table';

const theme = createMuiStrictModeTheme();

const columns = [
  { title: 'Items', field: 'items' },
  { title: 'Values', field: 'values' },
];

const FoodNutritionTable = ({ foodInfo }) => {
  const detail = useMemo(() => {
    if (!foodInfo) {
      return [];
    }
    const { id, image1, image2, image3, ...nutrition } = foodInfo;
    return Object.entries(nutrition).map(([items, values]) => ({
      items,
      values,
    }));
  }, [foodInfo]);

  return (
    <StyledTableContainer>
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Detail Information"
          columns={columns}
          data={detail}
          options={{
            search: true,
            sorting: true,
          }}
          style={{ zIndex: '1' }}
        />
      </ThemeProvider>
    </StyledTableContainer>
  );
};

FoodNutritionTable.propTypes = {
  foodInfo: PropTypes.oneOfType([any]).isRequired,
};

const StyledTableContainer = styled.div`
  margin-bottom: 3.5rem;
  margin: '0';
  width: 100%;
`;
export default FoodNutritionTable;
