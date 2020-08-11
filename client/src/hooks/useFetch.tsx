import { useCallback, useContext } from "react";
import { MatchDataDispatchContext } from "../context";
import {
  dataRequested,
  fetchDataSuccess,
  fetchDataError,
  addDataSuccess,
} from "../context/actions";
import useCustomHistory from "./useCustomHistory";

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
const useFetch = (navigatePath: string): [OnDemandFetch] => {

  const [ navigate] = useCustomHistory(navigatePath);

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
              navigate();
            } else if (type === FetchType.getAll) {
              dispatch(fetchDataSuccess(json));
              navigate();
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
