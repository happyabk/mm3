
import React from 'react';
import { Route } from 'react-router-dom';
import { RouteGroup } from '@mes/mes-ui-react';

import MonitoringContainer from './container/MonitoringContainer';


const Routes = () => (
  <RouteGroup path="/m2dd010100">
    <Route exact render={(props) => <MonitoringContainer {...props} />} />
  </RouteGroup>
);

export default Routes;
