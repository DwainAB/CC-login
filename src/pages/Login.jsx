import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{

      const response = await fetch('https://offers-api.digistos.com/api/auth/login',{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        },
      )


      if (!response.ok) {
        const data = await response.json();
        const error = new Error(
           data.error || "Une erreur est survenue lors de l'inscription."
        );
        error.status = response.status;
        throw error;
     }

     const data = await response.json()
     localStorage.setItem('auth', JSON.stringify({
      token : data.access_token,
      expiresAt : new Date(Date.now() + data.expires_in * 1000).toString()
     }))

      navigate('/offres/professionnelles')

    }catch(error){
      console.error('Une erreur est survenue', error)

      if(error.status === 401){
        setErrorMessage('Email ou mot de passe incorrect')
      }else{
        setErrorMessage('Une erreur est survenue')
      }

    } 
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Se connecter</h2>

            {errorMessage && (
              <Alert variant="danger" dismissible>
                <Alert.Heading>Erreur!</Alert.Heading>
                <p>{errorMessage}</p>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
