import React, { memo } from "react";
import { Container } from "react-bootstrap";
import Zero from "../../logos/zero.svg";
import styled from "styled-components"

const StyledImg = styled.img`
max-width: 100%;
height: auto;
width: 50px;
margin: 30px;
`;

const StyledContainer = styled(Container)`
text-align: center;
margin: 50px;
`;

const NotFound = (): JSX.Element => {
  return (
    <StyledContainer>
      <StyledImg
        src={Zero}
        alt="Zero Logo"
      />
      <p>
        <b>Hmm... There is not any player who played 3 or more match.</b>
      </p>
    </StyledContainer>
  );
};

export default memo(NotFound);