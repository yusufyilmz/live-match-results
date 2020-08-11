import React from "react";
import ListGroupItem from "./listGroupItem";
import { StyledRatingHeader } from "./playerList";

const Header = () => (
    <ListGroupItem>
        <span key="a"><b>Rank</b></span>
        <StyledRatingHeader key="b"><b>Name</b></StyledRatingHeader>
        <span key="c"></span>
    </ListGroupItem>
);

export default Header;