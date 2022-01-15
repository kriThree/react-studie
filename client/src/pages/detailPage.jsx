import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from '../components/LinkCard';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import LinksPage from './LinksPage';

export default function DetailPage(props) {
   const auth = useContext(AuthContext)
   const { request, loading } = useHttp();
   const [link, setLink] = useState(null);
   const linkId = useParams().id;

   const getLink = useCallback(async () => {
      try {
         const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
            authorization: 'Bearer ' + auth.token
         });
         setLink(fetched)
      } catch (e) {}
   }, [auth.token, linkId, request]);

   useEffect(()=>{
      getLink()
   },[getLink]);

   return (
      <>
         {!loading && link && <LinkCard link={link}/>}
      </>

   )
}