import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
// Import all the routes
import RsvpRoute from './pages/rsvp/rsvp';

// import getCookie from './helpers/cookie-consumer';
import asyncRoute from './components/async-route/async-route';

// Build the dynamic routes using the above loaders
const RsvpPage = asyncRoute(() => RsvpRoute);

const Routes = () => {
  return (
    <CSSTransitionGroup
      transitionName="fade-areas"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={150}
    >
      <Switch>
        <Route
          exact
          path="/rsvp"
          component={RsvpPage}
        />
      </Switch>
    </CSSTransitionGroup>
  );
};

export default Routes;
