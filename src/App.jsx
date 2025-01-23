import { useState } from 'react'
import './App.css'
import Authenticate from './components/Authenticate';
import SignUpForm from './components/SignUpForm';

export default function App() {

  const [token, setToken] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      {!isSubmitted && <SignUpForm setToken={setToken} setIsSubmitted={setIsSubmitted} />}
      {isSubmitted && token && <Authenticate token={token} />}
    </>
  );
}
