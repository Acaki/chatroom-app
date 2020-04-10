import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

export const AuthDataContext = createContext(null);

const initialAuthData = {};

const AuthDataProvider = (props) => {
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser !== null) {
      loggedUser = JSON.parse(loggedUser);
      setAuthData(loggedUser);
    }
  }, []);

  const onLogout = () => {
    setAuthData(initialAuthData);
    localStorage.removeItem('loggedUser');
  };

  const onLogin = (newAuthData) => setAuthData(newAuthData);

  const authDataValue = useMemo(() => ({ ...authData, onLogin, onLogout }), [authData]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
