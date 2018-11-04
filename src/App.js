import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from './pages/Home';
import { Favourites } from './pages/Favourites';
import { Notifications } from './pages/Notifications';
import { NoMatch } from './pages/NoMatch';
import { Author } from './pages/Author';
import { PostDetail } from './pages/PostDetail';
import { NewPost } from './pages/NewPost';
import { Comment } from './pages/Comment';
import { UserContext } from './context/user';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import {signup, login} from './services/authors';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    { ({user}) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
    )}
  </UserContext.Consumer>
);

class App extends Component {

  state = {
    user: undefined,
  }

  componentDidMount() {
    // TODO load user from storage and check if its credentials are still the same
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({
        user: JSON.parse(user),
      })
    }
  }

  loginUser = async (email, password) => {
    const user = await login(email, password);
    // fix setSetae in unmounted component
    this.setState({
      user
    }, () => {
      this.state.user && localStorage.setItem('user', JSON.stringify(this.state.user))
    })
    return user;
  }

  signupUser = async (email, password) => {
    const user = await signup(email, password);
    console.log('user added', user);
    this.setState({
      user
    }, () => {
      this.state.user && localStorage.setItem('user', JSON.stringify(this.state.user))
    })
  }

  logoutUser = () => {
    // TODO clean storage and db (to avoid to sync elements from a previous user)
    this.setState({
      user: undefined
    }, () => {
      localStorage.removeItem('user')
    })
  }

  render() {
    return (
      <UserContext.Provider value={{user: this.state.user, login: this.loginUser, logout: this.logoutUser, signup: this.signupUser}}>
        <BrowserRouter basename='/'>
            <div>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/profile" component={Profile}/>
                  <PrivateRoute exact path="/new" component={NewPost} />
                  <PrivateRoute exact path="/notifications" component={Notifications} />
                  <Route exact path="/favourites" component={Favourites} />
                  <PrivateRoute exact path="/comment/:postId" component={({match}) => <Comment postId={match.params.postId}/>} />
                  <Route exact path="/authors/:authorId" render={({match}) => <Author authorId={match.params.authorId}/>} />
                  <Route exact path="/post/:postId" render={({match}) => <PostDetail postId={match.params.postId}/>} />
                  <Route component={NoMatch} />
                </Switch>
            </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
