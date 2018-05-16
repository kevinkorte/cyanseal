
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact name="index" path="/" component={Index} />
      </Switch>
    )
  }
}

export default App;