import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

import Home from "./pages/Home";
import Post from "./pages/Post";
import Sensors from "./pages/Sensors";
import AddRoom from "./pages/AddRoom";

const App = () => {
  return (
    <>
      <Title>YDAY APP</Title>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms/:id" component={Post} />
          <Route path="/rooms/:id/sensor/:name" component={Sensors} />
          <Route path="/add" component={AddRoom} />
        </Switch>
      </Router>
    </>
  );
};

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 32px;
`;


export default App;
