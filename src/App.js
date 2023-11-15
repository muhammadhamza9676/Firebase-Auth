import { UserProvider } from './UserContext';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Alert from './components/Alert';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })


    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (

    <BrowserRouter>
      <UserProvider>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
          <Route exact path='/profile' element={<Profile showAlert={showAlert}/>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
