import React from 'react';
import { Link } from 'react-router-dom';

export default function LinksList({ links }) {
   console.log(links);
   if (!links.length) {
      return <p className='center'>У вас пока еще нет ссылок</p>
   }
   return (
      <>
         <table>
            <thead>
               <tr>
                  <th>№</th>
                  <th>Оригинальная</th>
                  <th>Сокращенная</th>
                  <th>Открыть</th>
               </tr>
            </thead>

            <tbody>
               {links.map((link, i) => {
                  return (
                     <tr key={link._id}>
                        <td>{i + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>{<Link to={`/detail/${link._id}`}>Открыть</Link>}</td>
                     </tr>
                  )
               })}

            </tbody>
         </table>
      </>
   )
}