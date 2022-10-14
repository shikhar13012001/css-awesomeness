import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Header from '../components/Header';
import Expenses from '../pages/Expenses';
import Page404 from '../pages/Page404';
import PrivateRoute from '../sections/@auth/PrivateRoute';
import PublicRoute from '../sections/@auth/PublicRoute';
import CheckStockprice from '../pages/CheckStockPrice';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home'; 

const Routes = () => {
  //hide header if route is home
 
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
          <PublicRoute restricted={true} exact path="/register" component={SignUp} />
          <PublicRoute restricted={true} exact path="/login" component={Login} />
        <React.Fragment>
          <Header />
          <PrivateRoute exact path="/expenses" component={Expenses} />
          <Route exact path="/checkstockprice" component={CheckStockprice} />
          <Route exact path="/aboutus" component={AboutUs} />
        </React.Fragment>
     
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default Routes;
