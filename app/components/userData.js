import React, { useState } from 'react';
import { executeMutation } from '../graphqlClient';
import { CREATE_USER_DATA_MUTATION } from '../mutation/createUserData';


const UserData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted.');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Age:', age);

    try {
      console.log('Preparing mutation with variables...');
      const variables = {
        name,
        email,
        age: parseInt(age, 10),
      };
      console.log('Variables:', variables);

      console.log('Executing mutation...');
      const response = await executeMutation(CREATE_USER_DATA_MUTATION, variables);

      console.log('Mutation executed successfully.');
      console.log('Response:', response);

      if (response?.createUserData) {
        console.log('Saved data:', response.createUserData);
      } else {
        console.log('No data returned from the mutation.');
      }
    } catch (error) {
      console.error('Error during mutation execution:', error);
    }
  };

  return (
    <div>
      <h1>Mutation Example</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserData;
