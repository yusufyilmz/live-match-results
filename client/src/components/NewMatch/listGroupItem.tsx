import React from "react";
import { ListGroup } from "react-bootstrap";

import styled from 'styled-components'

const StyledDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

const StyledListGroupItem = styled(ListGroup.Item)`
text-align: center;
`

const ListGroupItem = ({ children }: any) => {

    return <StyledListGroupItem>
        <StyledDiv>
            {children}
        </StyledDiv>
    </StyledListGroupItem>;
};

export default ListGroupItem;