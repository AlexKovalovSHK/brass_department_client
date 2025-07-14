import { JSX } from "react";
import { User } from "../../features/user/type";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ 
  user, 
  allowedRoles, 
  children 
}: { 
  user: User | undefined; 
  allowedRoles: string[]; 
  children: JSX.Element 
}) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const hasAccess = user.roles.some(role => allowedRoles.includes(role));
  
  if (!hasAccess) {
    return <Navigate to={getDefaultRoute(user.roles)} replace />;
  }

  return children;
};

// Функция для определения маршрута по умолчанию в зависимости от роли
const getDefaultRoute = (roles: string[]) => {
  if (roles.includes('SUPER_ADMINISTRATOR')) return '/super';
  if (roles.includes('ADMINISTRATOR')) return '/cabinet';
  if (roles.includes('USER')) return '/user';
  return '/';
};