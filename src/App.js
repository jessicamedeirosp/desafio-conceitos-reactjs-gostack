import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then( response => {      
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response =  await api.post('repositories',{
      title: `New repository ${ Date.now() }`,
      url: 'https://github.com/jessicamedeirosp/conceitos-dev', 
      techs: ['reactjs', 'js', 'node']
    });
    setRepositories([...repositories, response.data]);


  }

  async function handleRemoveRepository(id) {

   await api.delete(`repositories/${id}`);
   const newRepository = repositories.filter(
     repository => repository.id !== id
   );
   setRepositories(newRepository);

  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        {/* { repositories.map(repositories => <li key={repositories.id}>{repositories.title}</li>) } */}
       
        { repositories.map(({ id,title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li> )
        ) }
    
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
