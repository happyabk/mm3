
import React from 'react';
import { Route } from 'react-router-dom';
import { RouteGroup } from '@mes/mes-ui-react';


import TappingMoltenScheduleContainer from './container/TappingMoltenScheduleContainer';


const Routes = () => (
    <RouteGroup path="/m2dc010110">
      <Route exact render={(props) => <TappingMoltenScheduleContainer {...props} />} />
    </RouteGroup>
);

export default Routes;
