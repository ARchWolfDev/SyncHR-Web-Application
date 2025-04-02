// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ModalProvider } from './components/ModalProvider';
import PageContent from './components/PageContent';
import {ToastMessageBoxProvider} from './components/ToastMessageBoxProvider';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import AdminComponent from './components/AdminComponent';
import AdminDashboard from './components/AdminDashboard';
import AdminRequests from './components/AdminRequests';
// import MainPage from './components/MainPage';
import AdminEmployees from './components/AdminEmployees';
import AdminProjects from './components/AdminProjects';
import AdminTasks from './components/AdminTasks';
import AdminRoles from './components/AdminRoles';
import AdminProfiles from './components/AdminProfiles';
import ProfileComponent from './components/ProfileComponent';
import LoginPage from './components/LoginPage';
import AdminDepartments from './components/AdminDepartments';
import AdminTeams from './components/AdminTeams';
import DepartmentComponent from './components/DepartmentComponent';
import TestComponent from './components/TestComponent';
import AdminRequestsTimesheets from './components/AdminRequestsTimesheets';
import AdminRequestsTimeOff from './components/AdminRequestsTimeOff';
import AdminRequestsTickets from './components/AdminRequestsTickets';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './components/UserProvider';
import InternalDocumentation from './components/InternalDocumentation';

function App() {

  const location = useLocation();

  return (
    <ToastMessageBoxProvider>
      <UserProvider>
        <ModalProvider>
            <div className="App">
                <Routes location={location}>
                  <Route index path="/" element={<Navigate to='login'/>} />
                  <Route path='login' element={<LoginPage />} />

                  {/* SECURED ROUTE */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="home" element={<PageContent><HomeComponent /></PageContent>} />
                    <Route path="admin" element={<PageContent><AdminComponent /></PageContent>}>
                      <Route index element={<Navigate to="dashboard" />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="teams" element={<AdminTeams />}>
                        <Route index element={<Navigate to="employees" />} />
                        <Route path='employees' element={<AdminEmployees />} />
                        <Route path='departments' element={<AdminDepartments />} />
                      </Route>
                      <Route path='requests' element={<AdminRequests />}>
                        <Route index element={<Navigate to='timesheets'/>} />
                        <Route path='timesheets' element={<AdminRequestsTimesheets />} />
                        <Route path='timeoffs' element={<AdminRequestsTimeOff />} />
                        <Route path='tickets' element={<AdminRequestsTickets />} />
                      </Route>
                      <Route path='projects' element={<AdminProjects />} />
                      <Route path='tasks' element={<AdminTasks />} />
                      <Route path='roles' element={<AdminRoles />} />
                      <Route path='profiles' element={<AdminProfiles />} />
                    </Route>
                    <Route path='profile/:id' element={<PageContent><ProfileComponent/></PageContent>} />
                    <Route path='department/:id' element={<PageContent><DepartmentComponent /></PageContent>} />
                    <Route path='documentation/:docId' element={<PageContent><InternalDocumentation /></PageContent>} />
                  </Route>

                  <Route path='test'element={<TestComponent/>}></Route>
                </Routes>
            </div>
        </ModalProvider>
      </UserProvider>
    </ToastMessageBoxProvider>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;