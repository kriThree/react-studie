import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
export default function AuthPage(props) {
   const message = useMessage();
   const auth = useContext(AuthContext)
   const { loading, error, request,clearError } = useHttp();
   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value });
   }

   const registerHandler = async () => {
      try {
         const data = await request('api/auth/register', 'POST', { ...form });
         message(data.message)
      } catch (e) {
         throw new Error(e)
      }
   }
   const loginHandler = async () => {
      try {
         const data = await request('api/auth/login', 'POST', { ...form });
         auth.login(data.token,data.userId)
      } catch (e) {
         throw new Error(e)
      }
   }

   useEffect(() => {
      message(error);
      clearError()
   }, [error,message])
   return (
      <div className='row'>
         <div className="col s6 offset-s3">
            <h1>Сократи ссылку</h1>
            <div className="card purple darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Авторизация</span>
                  <div>
                     <div className="input-field">
                        <input
                           id="email"
                           type="text"
                           className="validate"
                           name='email'
                           onChange={changeHandler}
                           style={{ height: '60px' }}
                        />
                        <label htmlFor="emial">Введитe email</label>
                     </div>
                     <div className="input-field">
                        <input
                           id="password"
                           type="password"
                           className="validate"
                           name='password'
                           onChange={changeHandler}
                        />
                        <label htmlFor="password">Введите пароль</label>
                     </div>
                  </div>
               </div>
               <div className="card-action orange accent-4 ">
                  <button className='btn yellow darken-4' style={{ marginRight: '10px' }} disabled={loading} onClick={loginHandler}>Войти</button>
                  <button className='btn  brown lighten-5 black-text' onClick={registerHandler} disabled={loading}>Авторизироваться</button>
               </div>
            </div>
         </div>
      </div>
   )
}