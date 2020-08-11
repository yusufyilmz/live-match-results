import React from "react"
import { Button } from "react-bootstrap"
import styled from 'styled-components'
import Search from "../../logos/remove.svg";
import ListGroupItem from "./listGroupItem";

const StyledRating = styled.span`
height: 25px;
padding-right: .6em;
padding-left: .6em;
border-radius: 10rem;
background-color: black;
color: white;
`

const StyledRemoveButton = styled(Button)`
background: none;
border: none;
`

const PlayerCard = ({ index, name, removePlayer }: any) => {

    return (<ListGroupItem>
        <StyledRating>
            <span>{index + 1}</span>
        </StyledRating>
        <div>{name}</div>
        <StyledRemoveButton
            variant="info"
            onClick={() => removePlayer(name)}>
            <img src={Search} alt="Logo" />
        </StyledRemoveButton>
    </ListGroupItem>

    )
}

export default PlayerCard;