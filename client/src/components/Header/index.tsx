import React, { memo } from "react";
import { Jumbotron } from "react-bootstrap";

const Header = (): JSX.Element => {
  return (
    <Jumbotron>
      <h1 className="header">Match Results</h1>
    </Jumbotron>
  );
};

export default memo(Header);