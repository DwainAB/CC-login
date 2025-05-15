import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Logout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = async () => {

      const response = await fetch('https://offers-api.digistos.com/api/auth/logout', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        const data = await response.json()
        console.error('Une erreur est survenue lors de la déconnexion');
        throw { status: data.status, message: data.message }
      }

      dispatch(logout());

      navigate('/connexion')

    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
