import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { Match } from "../../context/actions";
interface MatchProps {
    item: Match;
}

const MatchItem = ({ item }: MatchProps) => {
    return (<ListGroupItem key={item._id}>
        <b>Match time: </b>
        <span>{new Date(item.createdAt).toLocaleString()} </span>
        <br />
        <b>Players: </b>
        {item.players.map((player: any) => <span key={player._id}>{player.name} </span>)}
    </ListGroupItem>
    );
};


export default MatchItem;