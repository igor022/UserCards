import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const Cookies = () => {
  const [res, setRes] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/auth/cookies/');
        console.log(response);
        setRes(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return (
    <Container maxWidth="sm">
      <h1>I ❤️ Cookies</h1>
      {
        res 
        ? 
        <div>
          {JSON.stringify(res)}
        </div>
        :
        <div>
          null
        </div>
      }
    </Container>
  );
}

export default Cookies;