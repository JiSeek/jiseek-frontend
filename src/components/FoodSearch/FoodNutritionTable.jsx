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
    headerGroups,
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

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
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
          <tr>
            {loading ? (
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * 5}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>
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
          const startRow = 5 * pageIndex;
          const endRow = startRow + 5;
          setData(detail.slice(startRow, endRow));
          setPageCount(Math.ceil(detail.length / 5));
          setLoading(false);
        }
      }, 1000);
    },
    [detail],
  );
  return (
    <Styles>
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
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
export default FoodNutritionTable;
