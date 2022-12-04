import React from 'react'
import { Login } from './login'
import { Register } from './regiter'

export const LoginAndRegister = ({setForm}) => {
  return (
    <section className='bg-gray-400 h-96 w-9/12 flex flex-row gap-x-32 justify-center items-center'>
        <Login setForm={setForm}/>
        <Register setForm={setForm}/>
    </section>
  )
}
