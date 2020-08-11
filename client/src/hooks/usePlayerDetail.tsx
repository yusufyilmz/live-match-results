import { useMatchDataStateContext } from "../context";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const usePlayerDetail = () => {
    const { name } = useParams();

    const { state } = useMatchDataStateContext();

    const player = useMemo(() => {
        return state.players.find(x => x.name === name)
    }, [state.players, name])

    return [ player ];
}

export default usePlayerDetail;