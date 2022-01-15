import React from 'react';

export default function LinkCard({ link }) {
   console.log(link);
   return (
      <>
         <h2>Ссылка </h2>
         <p>Ваша ссылка: <a href={link.to} target={'_blank'}>{link.to}</a></p>
         <p>Откуда : <a href={link.from} target={'_blank'}>{link.from}</a></p>
         <p>Кликов : <a href={link.from} target={'_blank'}><strong>{link.clicks}</strong></a></p>
         <p>Дата создания:{new Date(link.date).toLocaleDateString()}</p>
      </>
   )
}