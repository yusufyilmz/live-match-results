import React from "react";
import styled from 'styled-components'
import { InputGroup, Button } from "react-bootstrap";
import UserInput from "./userInput";
import PlayerList from "./playerList";
import usePostData from "../../hooks/usePostData";
import usePlayerData from "../../hooks/usePlayerData";
import ErrorModal from "../Modals/errorModal";

const StyledSubmitButton = styled(Button)`
width: 70%;
margin: 0 auto;
margin-top: 20px;
`
const NewMatch = (): JSX.Element => {

    const [playerData, error, resetError, updatePlayerData, removePlayerData] = usePlayerData();
    const [postData] = usePostData('/api/matches', '/players');

    return (
        <InputGroup style={{ margin: '0 auto' }} className="mb-3">
            <UserInput onClick={updatePlayerData} />
            <PlayerList removePlayer={removePlayerData} players={playerData} />
            {playerData.length > 1 && <StyledSubmitButton
                variant="info"
                onClick={() => postData({
                    players: playerData,
                    createdAt: new Date().toISOString()
                })} >
                Submit match
            </StyledSubmitButton>}
            {error && <ErrorModal
                error={error}
                onClick={() => resetError()} />}
        </InputGroup>

    );
};

export default NewMatch;
