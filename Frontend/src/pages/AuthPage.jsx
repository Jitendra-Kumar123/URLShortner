import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {

  const [login, setLogin] = useState(false)
  return (
     <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      {login ? <LoginForm state={setLogin}/> : <RegisterForm state={setLogin}/>}
     </div>
  )
}

export default AuthPage