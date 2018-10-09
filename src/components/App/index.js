import React from 'react';
import Form from '../Form';
import CitiesList from '../CitiesList';

const App = () => (
  <div className="container text-uppercase text-black-50 p-5">
    <h1 className="text-center">
      List of United States cities
    </h1>
    <Form />
    <CitiesList />
  </div>
);

export default App;
