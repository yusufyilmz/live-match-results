import { useState } from "react";

const usePlayerData = (): [string[], string, () => void, (d: string) => void, (d: string) => void] => {

    const [playerPlayerData, setPlayerData] = useState<Array<string>>([]);
    const [error, setError] = useState<string>('');

    const updatePlayerData = (currentPlayerData: string) => {
        if(!currentPlayerData){
            return setError("Enter a player")
        }

        if(playerPlayerData.indexOf(currentPlayerData) !== -1){
            return setError("You already entered this player")
        }

        setError('');
        setPlayerData(p => [...p, currentPlayerData]);
    };

    const removePlayerData = (playerPlayerData: string) => {
        setPlayerData(p => p.filter(a => a !== playerPlayerData));
    };

    const resetError = () => {
        setError('');
    };

    return [playerPlayerData, error, resetError, updatePlayerData, removePlayerData];
};

export default usePlayerData;
