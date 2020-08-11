import {
  ActionTypes,
  Action,
  Match,
  Player
} from "./actions";

export type State = {
  id: string;
  matches: Match[];
  players: Player[]
  isLoading: boolean;
  error: string;
};

const findPlayers = (matches: any) => {

  const players: any = {};

  matches.forEach((match: any) => {
    match.players.forEach((element: any) => {
      players[element.name] = players[element.name] ?
        {
          ...players[element.name],
          rating: element.rating,
          matches: [...players[element.name].matches, match],
          matchCount: players[element.name].matchCount + 1
        } :
        { ...element, matches: [match], matchCount: 1 }
    });
  })

  return Object.keys(players).map(x => players[x])
};

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case ActionTypes.request:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.success:
      return {
        ...state,
        isLoading: false,
        matches: action.results,
        players: findPlayers(action.results)
      };
    case ActionTypes.successAdd:

      let matches = [
        ...state.matches,
        action.results
      ];

      return {
        ...state,
        isLoading: false,
        matches,
        players: findPlayers(matches)
      };
    case ActionTypes.failure:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case ActionTypes.realTime:
       const latestMaches = [
        ...state.matches,
        action.results
      ];

      return {
        ...state,
        isLoading: false,
        matches: latestMaches,
        players: findPlayers(latestMaches)
      };
    default:
      return state;
  }
}

export default reducer;
