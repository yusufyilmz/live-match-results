import React, { memo } from "react";
import { Card } from "react-bootstrap";
import useCustomHistory from "../../hooks/useCustomHistory";

interface PlayerCardProps {
    name: string;
    rating: number;
    matchCount: number;
}

const CardText = (props: any) => (
    <Card.Text style={{ margin: 5 }}>
        {props.children}
    </Card.Text>
)


const PlayerCard = ({ name, rating, matchCount }: PlayerCardProps): JSX.Element => {

    const [navigate] = useCustomHistory(`/playerDetail/${name}`);

    return (
        <Card
            bg="light"
            text="dark"
            className="mb-2"
            onClick={navigate} >
            <Card.Header as="h5">Player name: {name} </Card.Header>
            <CardText>
                Rating: {rating}
            </CardText>
            <CardText>
                Match count: {matchCount}
            </CardText>
        </Card>

    );
};

export default memo(PlayerCard);
