import React, { useCallback, useContext, useEffect, useState } from 'react';
import LinksList from '../components/LinksList';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export default function LinksPage(props) {
   const [links, setLinks] = useState([]);
   const { request,loading } = useHttp();
   const auth = useContext(AuthContext);

   const fetchLinks = useCallback(async () => {
      try {
         const fetched = await request('api/link', 'GET', null, {
            authorization: 'Bearer ' + auth.token
         })
         setLinks(fetched)
      } catch (e) { }
   }, [auth.token, request]);

   useEffect(() => {
      fetchLinks()
   }, [fetchLinks]);

   return (
      <>
      {!loading&& <LinksList links={links} />}
      </>

   )
}