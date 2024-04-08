import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import SideDrawer from './components/SideDrawer';
import TableauFrame from './components/TableauFrame';
import Alarmlog from './components/Alarmlog';
import AlarmLogPage from './components/Alarmcatlog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppBar />} />
      <Route path="/sidedrawer" element={<SideDrawer />} />
      <Route path="/tableauframe" element={<TableauFrame />} />
      <Route path="/Alarmlog" element={<Alarmlog />} />
      <Route path="/AlarmLogPage" element={<AlarmLogPage />} />
    </Routes>
  );
}

export default App;