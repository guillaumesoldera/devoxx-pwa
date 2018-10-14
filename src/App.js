import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Favourites } from './pages/Favourites';
import { Notifications } from './pages/Notifications';
import { NoMatch } from './pages/NoMatch';
import { Author } from './pages/Author';
import { PostDetail } from './pages/PostDetail';
class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/'>
          <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/beers" component={Home} />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/favourites" component={Favourites} />
                <Route exact path="/:authorId" render={({match}) => <Author authorId={match.params.authorId}/>} />
                <Route exact path="/:authorId/:postId" render={({match}) => <PostDetail postId={match.params.postId}/>} />
                <Route component={NoMatch} />
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
