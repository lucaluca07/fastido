import ErrorBoundary from '@/components/error-boundary';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

const RouterMap = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          {routes.map((route) => {
            const { path, component } = route;
            return <Route exact key={path} path={path} component={component} />;
          })}
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouterMap;
