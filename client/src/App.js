import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PlaceholderScreen from './components/PlaceholderScreen';
import LoadingScreen from './components/LoadingScreen';
import ApplicationLayout from './components/ApplicationLayout';
import Home from './components/Home';
import TestComponent from './components/TestComponent';
import { ModalProvider } from './components/ModalProvider';

function App() {


  return (
    
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route path='/' index element={<HomePage/>}></Route>
            <Route path='login' element={<LoginPage/>}></Route>
            <Route path='app' element={<ApplicationLayout/>}>
              <Route path='home' index element={<Home/>}></Route>
            </Route>
            <Route path='/placeholder' element={<PlaceholderScreen/>}></Route>
            <Route path='/loading' element={<LoadingScreen/>}/>
            <Route path='/test' element={<TestComponent/>}/>
          </Routes>
        </ModalProvider>
      </BrowserRouter>
  );
}

export default App;