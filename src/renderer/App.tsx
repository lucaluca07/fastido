import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './router';

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
