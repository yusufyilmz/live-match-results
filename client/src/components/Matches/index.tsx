import React, {
  useMemo,
} from "react";
import { ListGroup, Button } from "react-bootstrap";
import MatchCard from "./matchCard";
import { Match } from "../../context/actions";

interface MatchListItems {
  items: Match[]
}

const MatchList = (
  { items }: MatchListItems
): JSX.Element => {

  const listItems = useMemo((): JSX.Element [] => {
    return items.map((child: any) => (
      <ListGroup.Item key={child._id}>
        <MatchCard createdAt={child.createdAt} players={child.players} />
      </ListGroup.Item>
    ))
  }, [items])
  
  return (
    <ListGroup variant="flush">
      {listItems}
    </ListGroup>
  );
};

export default MatchList;
