import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './components/containers/Layout/Layout';
import Beers from './components/containers/Beers/Beers';
import Favorites from './components/containers/Favorites/Favorites'
import {connect} from 'react-redux';



class App extends Component {
  render() {

    let routes  = (
      <Switch>
        <Route path='/favs' component={Favorites} />
        <Route path='/' exact component={Beers} />
        <Redirect to={"/"}/>
      </Switch>
    );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: true
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSign: () => dispatch(actions.onLoad())
//   }
// }

export default withRouter(connect(null, null)(App));
