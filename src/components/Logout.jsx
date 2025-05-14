import { useEffect } from 'react';
import { useNavigate } from 'react-router';


const Logout = () => {

   const navigate = useNavigate()

   useEffect(() => {
    const handleLogout = async () => {
      
      const response = await fetch ('https://offers-api.digistos.com/api/auth/logout',{
        method: 'POST',
        headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`,
        }
      })

      if(!response.ok){
        const data = await response.json()
        console.error('Une erreur est survenue lors de la déconnexion');
        throw{status : data.status, message : data.message}
      }

      localStorage.removeItem('auth')
      navigate('/connexion')
    };

    handleLogout();
  }, []);

  return null; 
};

export default Logout;
