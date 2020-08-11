import React, { useMemo } from "react";
import styled from 'styled-components';
import { ListGroup } from "react-bootstrap";
import PlayerCard from './playerCard';
import Header from "./header";

export const StyledRatingHeader = styled.span`
    margin-left: -50px;
`
const StyledFieldSet = styled.fieldset`
    width: 100%;
`
const StyledListGroup = styled(ListGroup)`
    width: 70%;
    margin: 0 auto;
`

interface PlayerListProps {
    players: string[]
    removePlayer: any
}

const PlayerList = ({ players, removePlayer }: PlayerListProps): JSX.Element | null => {


    const playerList = useMemo((): JSX.Element[] => {

        const playerList = players.map((player: string, i: number) => (<PlayerCard
            name={player}
            key={i}
            index={i}
            removePlayer={removePlayer} />))

        return [<Header  key="title"/>, ...playerList]
    }, [players])

    if (players.length === 0) return null;

    return <>
        <StyledFieldSet>
            <StyledListGroup variant="flush" >
                <legend>Players:</legend>
                {playerList}
            </StyledListGroup>
        </StyledFieldSet>
    </>
}

export default PlayerList;