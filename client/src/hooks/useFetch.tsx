import { useCallback, useContext } from "react";
import { MatchDataDispatchContext } from "../context";
import {
  dataRequested,
  fetchDataSuccess,
  fetchDataError,
  addDataSuccess,
} from "../context/actions";
import { useHistory } from "react-router-dom";

type OnDemandFetch = (
  url: string,
  type: FetchType,
  options: RequestInit,
) => Promise<void>;

export enum FetchType {
  getAll,
  get,
  add
}
const useFetch = (navigate: string): [OnDemandFetch] => {

  const history = useHistory();

  const { dispatch } = useContext(MatchDataDispatchContext);
  const onDemandFetch = useCallback(
    (url: string,
      type: FetchType,
      options: RequestInit): Promise<void> => {
      const fetchData = async () => {
        try {
          dispatch(dataRequested());
          const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, options);
          const json = await res.json();
          if (res.status !== 200) {
            dispatch(fetchDataError(json));
          } else {
            if (type === FetchType.add) {
              dispatch(addDataSuccess(json));
              history.push(navigate)
            } else if (type === FetchType.getAll) {
              dispatch(fetchDataSuccess(json));
              history.push(navigate)
            }
          }
        } catch (e) {
          dispatch(fetchDataError(e));
        }
      };

      fetchData();
      return Promise.resolve();
    },
    []
  );

  return [onDemandFetch];
};

export default useFetch;
