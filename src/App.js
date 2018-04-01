import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './components/containers/Layout/Layout';
import Beers from './components/containers/Beers/Beers';
import Favorites from './components/containers/Favorites/Favorites'
import {connect} from 'react-redux';
import ModalHoc from './hoc/ModalHoc/ModalHoc';



class App extends Component {
  render() {
    //Switch - only one route at the time
    //in case of not match redirection to home - "/"
    let routes  = (
      <Switch>
        <Route path='/' exact component={Beers} />
        <Route path='/favs' component={Favorites} />
        <Route path='/details/:id' component={ModalHoc}/>
        <Redirect to="/"/>
      </Switch>
    );

    return (
      //wrapping routes inside Layout hoc
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(App));
