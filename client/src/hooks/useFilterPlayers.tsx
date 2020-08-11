import { useMemo } from "react";
import { useMatchDataStateContext } from "../context";
import { Player } from "../context/actions";

const useFilterPlayers = () => {

    const { state } = useMatchDataStateContext();

    const filteredPlayers = useMemo(() => {

        const filter = (obj: Record<string, any>, predicate: any) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .map(key => obj[key])

        return filter(state.players, (player: Player) => player.matchCount >= 3);


    }, [state.players]);

    return [filteredPlayers];
}

export default useFilterPlayers;