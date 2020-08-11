import React, { PropsWithChildren, } from "react";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import PlayerCard from "./playerCard";
import useShowMore from "../../hooks/useShowMore";
import { Player } from "../../context/actions";

const StyledListGroup = styled(ListGroup)`
flex-direction: row;
flex-wrap: wrap;
`

const StyledListGroupITem = styled(ListGroup.Item)`
width: 50%;
@media (max-width:768px) {
    width: 100%;
}
flex-wrap: wrap;
`

interface PlayerListItems {
    items: Array<Player>;
}

const PlayerList = (
    { items }: PropsWithChildren<PlayerListItems>
): JSX.Element => {

    const [listitems, ShowMoreButton] = useShowMore(items);

    const playerList = React.useMemo(
        () => listitems.map((child: any) => (
            <StyledListGroupITem
                key={child._id}>
                <PlayerCard
                    matchCount={child.matchCount}
                    rating={Math.round(child.rating)}
                    name={child.name}
                />
            </StyledListGroupITem>
        )),
        [listitems],
    )

    return (
        <StyledListGroup variant="flush">
           {playerList}
        <ShowMoreButton/>
        </StyledListGroup>
    );
};

export default PlayerList;
