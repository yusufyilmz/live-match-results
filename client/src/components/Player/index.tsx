import React from "react";
import { Col } from "react-bootstrap";
import PlayerList from "./playerList";
import useFilterPlayers from "../../hooks/useFilterPlayers";
import NotFound from "../Pages/NotFound";

const Players = (): JSX.Element => {

    const [ players ] = useFilterPlayers();

    console.log('players')
    console.log(players)

    if(players.length === 0) return <NotFound/>;
    
    return <Col>
        <PlayerList items={players} />
    </Col>
};

export default Players;

