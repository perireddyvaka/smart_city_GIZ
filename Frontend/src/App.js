import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AppBar from './components/AppBar';
import SideDrawer from './components/SideDrawer';
import TableauFrame from './components/TableauFrame';
import Alarmlog from './components/Alarmlog';
import AlarmLogPage from './components/Alarmcatlog';
import LogStore from './components/LogStore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/appbar" element={<AppBar />} />
      <Route path="/sidedrawer" element={<SideDrawer />} />
      <Route path="/tableauframe" element={<TableauFrame />} />
      <Route path="/Alarmlog" element={<Alarmlog />} />
      <Route path="/AlarmLogPage" element={<AlarmLogPage />} />
      <Route path="/LogStore" element={<LogStore />} />
    </Routes>
  );
}

export default App;