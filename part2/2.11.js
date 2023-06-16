import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  // Rest of your code...

  return (
    // Your JSX code...
  );
};

export default App;
