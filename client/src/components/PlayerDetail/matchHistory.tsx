import React, { useMemo } from "react";
import { ListGroup } from "react-bootstrap";
import { Match } from "../../context/actions";
import MatchHistoryItem from "./matchHistoryItem";

const MatchHistory = ({ matches }: any) => {

    const matchItems = useMemo(() => matches.map((match: Match) =>
        <MatchHistoryItem key ={match._id} item={match} />), [matches]);

    return (
        <ListGroup className="list-group-flush">
            {matchItems}
        </ListGroup>);

};

export default MatchHistory;
