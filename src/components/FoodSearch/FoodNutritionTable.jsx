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
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      pageCount: controlledPageCount,
    },
    usePagination,
  );
  console.log('pageCount', pageCount);

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  console.log('headerGroups', headerGroups);
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      <>{column.isSortedDesc ? ' 🔽' : ' 🔼'}</>
                    ) : (
                      ''
                    )}
                  </span>
                </th>
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
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
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
        </button>{' '}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const tempPage = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(tempPage);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((tempPageSize) => (
            <option key={tempPageSize} value={tempPageSize}>
              Show {tempPageSize}
            </option>
          ))}
        </select>
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

  // return (
  //   <StyledTableContainer>
  //     <ThemeProvider theme={theme}>
  //       <MaterialTable
  //         title="Detail Information"
  //         columns={columns}
  //         data={detail}
  //         options={{
  //           search: true,
  //           sorting: true,
  //         }}
  //         style={{ zIndex: '1' }}
  //       />
  //     </ThemeProvider>
  //   </StyledTableContainer>
  // );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      fetchIdRef.current += 1;
      const fetchId = fetchIdRef.current;

      setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(detail.slice(startRow, endRow));

          setPageCount(Math.ceil(detail.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [detail],
  );
  console.log('columns', columns);
  console.log('data', data);
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

// const StyledTableContainer = styled.div`
//   margin-bottom: 3.5rem;
//   margin: '0';
//   width: 100%;
// `;

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
