import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Favourites } from './pages/Favourites';
import { Notifications } from './pages/Notifications';
import { NoMatch } from './pages/NoMatch';
class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/'>
          <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/beers" component={Home} />
                <Route exact path="/notifications" component={Notifications} />
                <Route path="/favourites" component={Favourites} />
                <Route component={NoMatch} />
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
