import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from "./pages/AutnPage";
import CreatePage from "./pages/createPage";
import DetailPage from "./pages/detailPage";
import LinksPage from "./pages/LinksPage";
export const useRoutes = isAuthenicated => {
   if (isAuthenicated) {
      return (
         <>
            <Routes>
               <Route path="/links" element={<LinksPage />} />

               <Route path="/create" element={<CreatePage />} />

               <Route path="/detail/:id" element={<DetailPage />} />

               <Route path="*" element={<CreatePage />} />
            </Routes>
         </>
      )
   }
   return (
      <Routes>
         <Route path="/" element={<AuthPage />} />
         <Route path="*" element={<AuthPage />} />
      </Routes>
   )
}