import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import "../assets/styles/Header.css";
import { useEffect, useState } from "react";

function Header() {
  const [token, setToken] = useState()
  const location = useLocation()

  const getValideToken = () =>{
    const auth = JSON.parse(localStorage.getItem('auth'))
    const isValid = auth && new Date(auth.expiresAt) > new Date()
    return isValid ? auth.token : null 
  }

  useEffect(()=>{
    setToken(getValideToken())
  }, [location])



  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/professionnelles">
            Offres Professionnelles
          </Nav.Link>
          {token ?
            <Nav.Link as={NavLink} to="/deconnexion">
              Déconnexion
            </Nav.Link>
          :
          <>
            <Nav.Link as={NavLink} to="/connexion">
              Connexion
            </Nav.Link>
            <Nav.Link as={NavLink} to="/inscription">
              Inscription
            </Nav.Link>
          </>
          } 
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
