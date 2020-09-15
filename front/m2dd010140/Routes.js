
import React from 'react';
import { Route } from 'react-router-dom';
import { RouteGroup } from '@mes/mes-ui-react';

import SteelScheduleMonitoringContainer from './container/SteelScheduleMonitoringContainer';


const Routes = () => (
  <RouteGroup path="/m2dd010140">
    <Route exact render={(props) => <SteelScheduleMonitoringContainer {...props} />} />
  </RouteGroup>
);

export default Routes;
