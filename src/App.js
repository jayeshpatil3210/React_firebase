import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/common/Form';
import Home from './components/common/Home';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    console.log(authToken)
    if (authToken) {
      navigate('/home')
    }

    if (!authToken) {
      navigate('/register')
    }
  }, [])

  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          console.log(response);
          navigate('/home')
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
    }

  }


  return (

    <div className="App">
      <Navbar />
      <ToastContainer />
      <>
        <Routes>
          <Route path='/login' element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
          <Route path='/register' element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
          <Route
            path='/home'
            element={
              <Home />}
          />
        </Routes>
      </>
      <Footer />
    </div>
  );
}

export default App;
