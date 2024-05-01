import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/Usermanagement/LoginPage';
import SignupPage from './components/Usermanagement/SignupPage';
import AppBar from './components/Usermanagement/AppBar';
import SideDrawer from './components/SideDrawer';
import TableauFrame from './components/TableauFrame';
import Alarmlog from './components/Alarm/Alarmlog';
import AlarmLogPage from './components/Alarm/Alarmcatlog';
import LogStore from './components/Alarm/LogStore';
import ExistingUsersPage from './components/Usermanagement/ExistingUsersPage';
import ExistingUsersTable from './components/Usermanagement/ExistingUsersTable';
import Subdivsionhead from './components/Usermanagement/Subdivisionhead';
import AppBarComponent from './components/Usermanagement/Appbar2';
import OrganizationHeadPage from './components/Usermanagement/Organizationhead';
import CircleHeadPage from './components/Usermanagement/Circlehead';
import DivisionHeadPage from './components/Usermanagement/Divisionhead';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/existing-users" element={<ExistingUsersPage />} />
      <Route path="/existing-users" element={<ExistingUsersTable />} />
      <Route path="/Subdivisionhead" element={<Subdivsionhead />} />
      <Route path="/organizationhead" element={<OrganizationHeadPage />} />
      <Route path="/circlehead" element={<CircleHeadPage />} />
      <Route path="/divisionhead" element={<DivisionHeadPage />} />
      <Route path="/Appbar2" element={<AppBarComponent />} />
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