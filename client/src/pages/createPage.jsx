import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useNavigate } from "react-router-dom";

export default function CreatePage(props) {
   const navigate = useNavigate()
   const auth = useContext(AuthContext);
   const { request } = useHttp()
   const [link, setLink] = useState(' ');

   const pressHandler = async event => {
      console.log('e');
      if (event.key === 'Enter') {
         try {
            const data = await request('/api/link/generate', 'POST', { from: event.target.value }, {
               authorization: 'Bearer ' + auth.token
            });
            navigate(`/detail/${data.Link._id}`, { replace: true })
         } catch (e) {
            throw new Error(e)
         }
      }
   }
   return (
      <div className='row'>
         <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
            <div className="input-field">
               <input
                  id="link"
                  type="text"
                  className="validate"
                  style={{ height: '60px' }}
                  onChange={e => setLink(e.target.link)}
                  onKeyPress={pressHandler}
               />
               <label htmlFor="link">Введите ссылку</label>
            </div>
         </div>
      </div>

   )
}