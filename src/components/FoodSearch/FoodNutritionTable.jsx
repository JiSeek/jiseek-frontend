import React, {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import PropTypes, { any } from 'prop-types';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from 'react-icons/bi';

const Table = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) => {
  /* eslint-disable react/jsx-props-no-spreading */
  const {
    getTableProps,
    getTableBodyProps,
    // headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,

    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,

      pageCount: controlledPageCount,
    },
    usePagination,
  );

  useEffect(() => {
    fetchData({ pageIndex });
  }, [fetchData, pageIndex]);

  console.log(loading);

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead />
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <Pagination>
        <span>
          <button
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <BiArrowToLeft />
          </button>
          <button
            type="button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <BiLeftArrowAlt />
          </button>
        </span>
        <p>
          {pageIndex + 1} / {pageOptions.length}
        </p>
        <span>
          <button
            type="button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <BiRightArrowAlt />
          </button>
          <button
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiArrowToRight />
          </button>
        </span>
      </Pagination>
    </>
  );
};

const FoodNutritionTable = ({ foodInfo }) => {
  const columns = [
    { Header: 'Items', accessor: 'items' },
    { Header: 'Values', accessor: 'values' },
  ];
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    ({ pageIndex }) => {
      fetchIdRef.current += 1;
      const fetchId = fetchIdRef.current;

      setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = 7 * pageIndex;
          const endRow = startRow + 7;
          setData(detail.slice(startRow, endRow));
          setPageCount(Math.ceil(detail.length / 7));
          setLoading(false);
        }
      }, 1000);
    },
    [detail],
  );
  return (
    <Styles>
      <h2>상세 영양 정보</h2>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  );
};

Table.propTypes = {
  columns: PropTypes.oneOfType([any]).isRequired,
  data: PropTypes.oneOfType([any]).isRequired,
  fetchData: PropTypes.oneOfType([any]).isRequired,
  loading: PropTypes.oneOfType([any]).isRequired,
  pageCount: PropTypes.oneOfType([any]).isRequired,
};

FoodNutritionTable.propTypes = {
  foodInfo: PropTypes.oneOfType([any]).isRequired,
};

const Styles = styled.div`
  width: 24vw;
  height: 28vw;
  max-width: 320px;
  max-height: 340px;

  > h2 {
    text-align: center;
    font-size: 1.05rem;
    margin-bottom: 0.75rem;
  }
`;

const StyledTable = styled.table`
  font-size: 0.85rem;
  margin-top: 2rem;

  > thead {
    display: none;
  }

  > tbody > tr {
    > td {
      padding: 0.95rem 1.25rem;

      :first-child {
        min-width: 140px;
        background: #f0f3ee;
        border-radius: 0 0 5px 5px;
        font-weight: 500;
      }
      :last-child {
        min-width: 98px;
      }
    }

    :nth-child(2n) {
      > td {
        :first-child {
          background: none;
        }
        :last-child {
          background: #f6fff2;
        }
      }
    }
  }
`;

const Pagination = styled.div`
  width: 22vw;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;

  button {
    border: none;
    background: none;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 0.15rem;
  }
`;

export default FoodNutritionTable;
