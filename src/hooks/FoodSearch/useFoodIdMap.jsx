import { useMemo } from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { foodKeys } from '../../constants';

/*
  Return Values:
    - foodIdMap: 음식 이름을 key로 id 값을 value로 갖는 객체
    - isLoading: 최초 쿼리 로딩 여부 상태 플래그
    - isError: 쿼리 중 에러 발생 여부 상태 플래그
    - status: idle | loading | error | success 중 하나의 상태 값
*/
const useFoodIdMap = () => {
  // 전체 음식명 조회 쿼리
  const { data, status, isLoading, isError } = useQuery(
    foodKeys.all,
    jiseekApi.get(),
    { staleTime: Infinity, cacheTime: Infinity },
  );

  // 전체 음식 이름 -> ID 매핑 테이블
  const foodIdMap = useMemo(() => {
    const table = { '': -1 };
    data?.forEach(({ id, name }) => {
      table[name] = id;
    });
    return table;
  }, [data]);

  return { foodIdMap, isLoading, isError, status };
};

export default useFoodIdMap;
