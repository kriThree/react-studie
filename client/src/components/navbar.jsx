import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Navbar() {

   const auth  = useContext(AuthContext);

   const logoutHandler = event =>{
      event.preventDefault();
      auth.logout();
   }
   return (
      <nav>
         <div className="nav-wrapper" style={{padding:'0 4em'}}>
            <span className="brand-logo">Сокращение ссылок</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><NavLink to={'/create'}>Создать</NavLink></li>
               <li><NavLink to={'/links'}>Ссылки</NavLink></li>
               <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
         </div>
      </nav>
   )
}