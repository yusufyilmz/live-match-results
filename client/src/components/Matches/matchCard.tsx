import React, { useMemo } from "react";
import { Card, InputGroup } from "react-bootstrap";
import PlayerCard from "../Player/playerCard";
import styled from "styled-components";

const StyledCardBody = styled(Card.Body)`
width: 100%;
`

const StyledCardSubtitle = styled(Card.Subtitle)`
color: darkgray;
`

interface MatchCardProps {
    createdAt: string;
    players: string[];
}

const MatchCard = ({ createdAt, players }: MatchCardProps): JSX.Element => {

    const playerList = React.useMemo(
        () => players.map((player: any) =>
            <PlayerCard 
            matchCount={player.matchCount}
            name={player.name} 
            rating={Math.round(player.rating)} />),
        [players],
    )

    return (
        <StyledCardBody>
            <Card.Title >Players {playerList}</Card.Title>
            <StyledCardSubtitle>
                Match Date: {new Date(createdAt).toLocaleString()}
            </StyledCardSubtitle>
        </StyledCardBody>
    );
};
export default MatchCard;
