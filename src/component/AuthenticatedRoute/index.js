import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const userId = localStorage.getItem('token');
  return (
    <Route
      exact
      {...rest}
      render={(routeProps) => (userId ? <Component {...routeProps} /> : <Redirect to="/login" />)}
    />
  );
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthenticatedRoute;
