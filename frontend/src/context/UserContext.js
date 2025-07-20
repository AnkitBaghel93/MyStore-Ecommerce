// context/UserContext.jsx
import BACKEND_URL from '../config';


import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      

      if (!token) {
        console.warn('No token found, setting user to null');
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        
const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

       
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching user:', err.response?.data || err.message);
        setUser(null);
      } finally {
        
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};
