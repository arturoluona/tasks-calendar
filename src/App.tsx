import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Dashboard, Calendar } from '@/pages';
import { NavBar } from '@/components';
import store from '@/redux/store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/calendar'} element={<Calendar />} />
      </Routes>
    </Provider>
  );
};

export default App;
