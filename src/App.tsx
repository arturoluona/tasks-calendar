import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Calendar } from '@/pages';
import { NavBar } from '@/components';
import './App.css';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/calendar'} element={<Calendar />} />
      </Routes>
    </>
  );
};

export default App;
