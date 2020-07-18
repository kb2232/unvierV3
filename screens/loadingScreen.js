import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from './context/AuthContext';

const ResolveAuth = () => {
  const info = useContext(AuthContext);
  useEffect(() => {
    info.tryLocalSign();
  }, [info]);
  return null;
};
export default ResolveAuth;
