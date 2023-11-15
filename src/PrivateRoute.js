import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useUser } from './UserContext'; 

function PrivateRoute({ element, ...rest }) {
  const { user } = useUser(); // Access the user from the context

  return user ? ( // Check if the user is authenticated
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" /> // Redirect to the login page if there is no user
  );
}

export default PrivateRoute;
