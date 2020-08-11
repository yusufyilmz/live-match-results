export enum ActionTypes {
  request,
  success,
  successAdd,
  failure,
  realTime
}
export interface Player {
  name: string;
  _id: string;
  rating: number;
  matchCount: number,
  matches: Match []
}
export interface Match {
  _id: string;
  createdAt: string;
  players: Player [];
}

export type Action =
  | { type: ActionTypes.request }
  | { type: ActionTypes.success; results: any; }
  | { type: ActionTypes.successAdd; results: any; }
  | { type: ActionTypes.realTime; results: any; }
  | { type: ActionTypes.failure; error: string; };

export function dataRequested(): Action {
  return {
    type: ActionTypes.request,
  };
}

export function fetchDataSuccess(data: any): Action {
  return {
    type: ActionTypes.success,
    results: data
  };
}

export function addDataSuccess(data: any): Action {
  return {
    type: ActionTypes.successAdd,
    results: data
  };
}


export function fetchDataError(error: string): Action {
  return {
    type: ActionTypes.failure,
    error,
  };
}

export function realTimeDataUpdated(data: any): Action {
  return {
    type: ActionTypes.realTime,
    results: data,
  };
}


