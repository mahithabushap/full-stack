import React, { useState, useEffect } from 'react';
import personService from './services/personService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName('');
            setNewNumber('');
            setNotification(`Updated ${existingPerson.name}'s number`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Error updating ${existingPerson.name}'s number`,
              isError: true,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setNotification(`Added ${newPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Error adding ${newPerson.name}`,
            isError: true,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  // Rest of the component code...

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      {/* Rest of the component JSX */}
    </div>
  );
};

export default App;
