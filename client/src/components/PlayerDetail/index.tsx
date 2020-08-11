import React from "react";
import { Card } from "react-bootstrap";
import usePlayerDetail from "../../hooks/usePlayerDetail";
import useBackButton from "../../hooks/useBackButton";
import MatchHistory from "./matchHistory";

const PlayerDetail = (): JSX.Element | null => {

    const [ player ] = usePlayerDetail();
    const [ BackButton ] = useBackButton('/players');

    if (!player) return null;

    return (
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>Player Name: {player.name}</Card.Title>
                <Card.Text>
                    Games History:
                </Card.Text>
            </Card.Body>
            <MatchHistory matches={player.matches} />
            <BackButton/>
        </Card>
    );
};


export default PlayerDetail;