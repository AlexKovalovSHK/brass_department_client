import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./components/accouting/ProtectedRoute";
import Cabinet from "./components/Cabinet";
import MainSuperAdmin from "./components/super/MainSuperAdmin";
import Login from "./components/accouting/Login";
import UserCabinet from "./components/userComponent/UserCabinet";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { authUser, selectUser, selectUserStatus } from "./features/user/userSlice";
import { getDefaultRoute } from "./components/accouting/getDefaultRoute";

//export const apiUrl = 'http://localhost:8080';
export const apiUrl = "https://brass-serv.shk.solutions";
//export const apiUrl = process.env.REACT_APP_API_URL;

 export const App = () => {
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);


  if (status === 'loading' || status === 'idle') {
    return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
  }

  return (
    <div className="">
      <Routes>
        <Route path="/" element={
          // Проверяем, есть ли пользователь ПОСЛЕ завершения загрузки
          user?.id ? <Navigate to={getDefaultRoute(user.roles)} /> : <Login />
        } />
        
        <Route path="/cabinet" element={
          <ProtectedRoute user={user} allowedRoles={['ADMINISTRATOR']}>
            <Cabinet />
          </ProtectedRoute>
        } />
        
        <Route path="/super" element={
          <ProtectedRoute user={user} allowedRoles={['SUPER_ADMINISTRATOR']}>
            <MainSuperAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/user" element={
          <ProtectedRoute user={user} allowedRoles={['USER']}>
            <UserCabinet />
          </ProtectedRoute>
        } />

        {/* Можно добавить маршрут для 404 страницы */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};