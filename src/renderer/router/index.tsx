import ErrorBoundary from '@/components/error-boundary';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes, { RouteProps } from './routes';

const RouterMap = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          {routes.map((route: RouteProps) => {
            const { exact = true, path, component } = route;
            return (
              <Route
                exact={exact}
                key={path}
                path={path}
                component={lazy(() => import(`@/pages${component || path}`))}
              />
            );
          })}
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouterMap;
