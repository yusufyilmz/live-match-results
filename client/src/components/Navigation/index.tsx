import React, { memo } from "react";
import { Nav } from "react-bootstrap";
import NavigationItem from "./navItem";

const NavigationBar = (): JSX.Element => {
  return (
    <Nav style={{ width: '100%' }} defaultActiveKey="/players" justify fill variant="tabs">
      <NavigationItem link = "/players" title="players" />
      <NavigationItem link = "/submit" title="Submit new match" />
    </Nav>
  );
};

export default memo(NavigationBar);
