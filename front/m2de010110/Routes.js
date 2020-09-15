import React from 'react';
import { Route } from 'react-router-dom';
import { RouteGroup } from '@mes/mes-ui-react';

import DailyProductionPlanningContainer from './container/DailyProductionPlanningContainer';

const Routes = () => (
  <RouteGroup path="/m2de010110">
    <Route exact render={(props) => <DailyProductionPlanningContainer {...props} />} />
  </RouteGroup>
);

export default Routes;
