import { Route } from "react-router-dom";
import Players from "./Player";
import NewMatch from "./NewMatch";
import PlayerDetail from "./PlayerDetail";
import useInitialFetch from "../hooks/useInitialFetch";
import React from "react";

const Routes = () => {

    useInitialFetch('/api/matches', '/players');
  
    return (
      <>
        <Route exact path="/players">
          <Players />
        </Route>
        <Route exact path="/submit">
          <NewMatch />
        </Route>
        <Route path="/playerDetail/:name">
          <PlayerDetail />
        </Route>
      </>
    )
  }
  

  export default Routes;