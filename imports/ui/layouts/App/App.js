
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import Signup from '../../pages/Signup/Signup';
import bootstrap from 'bootstrap';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Route name="signup" path="/signup" component={Signup} />
          
        </Switch> 
      </Router>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <div>Index</div>
        <Button color="danger">Danger!</Button>
      </div>
    )
  }
}

export default App;