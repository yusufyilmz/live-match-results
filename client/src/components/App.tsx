import React from "react";
import { Container, Row } from "react-bootstrap";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MatchDataProvider } from "../context";
import NavigationBar from "./Navigation";
import Header from "./Header";
import Routes from "./Routes";

const customHistory = createBrowserHistory();

const App = (): JSX.Element => {
  return (
    <Container className="p-5">
      <Header />
      <Row>
        <Router history={customHistory}>
            <MatchDataProvider>
              <NavigationBar />
              <Switch>
                <Routes />
              </Switch>
            </MatchDataProvider>
        </Router>
      </Row>
    </Container>
  );
};

export default App;
