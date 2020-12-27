import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Names from './components/Names';
import Name from './components/Name';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Names} />
        <Route path='/names/:name' component={Name} />
      </Switch>
    </>
  );
}

export default App;