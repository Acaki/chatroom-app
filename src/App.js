import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthDataProvider from './AuthDataProvider';
import Router from './router';
import './App.css';
import TopBar from './Header';

const App = () => (
    <BrowserRouter>
      <AuthDataProvider>
        <TopBar />
        <Router />
      </AuthDataProvider>
    </BrowserRouter>
);

export default App;
