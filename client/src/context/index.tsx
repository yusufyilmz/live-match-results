import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  Dispatch,
  PropsWithChildren,
} from "react";
import reducer, { State } from "./reducer";
import {
  Action,
  Match,
  Player
} from "./actions";

import { initSockets } from "../socket";
import { uniqueID } from "../utils";

export type ContextDispatchInterface = { dispatch: Dispatch<Action> };

export type ContextStateInterface = {
  state: {
    id: string;
    matches: Match[];
    isLoading: boolean;
    error: string;
    players: Player []
  };
};


const initialState = {
  id: uniqueID(),
  isLoading: false,
  matches: new Array<Match>(),
  players: new Array<Player>(),
  error: '',
} as State;


export const MatchDataStateContext = createContext<ContextStateInterface>({
  state: initialState
});


export const MatchDataDispatchContext = createContext<
  ContextDispatchInterface
>({
  dispatch: () => null,
});

export const useMatchDataDispatchContext = (): ContextDispatchInterface => {
  const contextValue = useContext(MatchDataDispatchContext);

  return contextValue;
};

export const useMatchDataStateContext = (): ContextStateInterface => {
  const contextValue = useContext(MatchDataStateContext);

  return contextValue;
};

export const MatchDataProvider = (
  { children }: PropsWithChildren<unknown>
): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => initSockets({ dispatch, state }), [initSockets]);
  
  return (
    <MatchDataDispatchContext.Provider value={{ dispatch }}>
      <MatchDataStateContext.Provider value={{ state }}>
        {children}
      </MatchDataStateContext.Provider>
    </MatchDataDispatchContext.Provider>
  );
};
