import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
import Layout from './components/Layout/Layout';
import Blog from './containers/Blog/Blog';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import NewPost from './containers/NewPost/NewPost';

import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Blog} />
        
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/create-post" component={NewPost} />
          <Route path="/" component={Blog} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth.role);
  return {
    isAuthenticated: state.auth.role !== null
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

