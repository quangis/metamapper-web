import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.sass';

import Hero from './components/Hero';
import Content from './components/Content';
import Concepts from './components/Concepts';
import Annotate from './components/Annotate';

function App() {
  return (
    <Router>
      <div className="App">
        <Hero />

        <Switch>
          <Route path="/concepts">
            <Concepts />
          </Route>

          <Route path="/annotate/:sourceId" component={Annotate} />

          <Route path="/">
            <Content />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
