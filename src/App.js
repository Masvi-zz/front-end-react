import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'http://local.teste.com',
      techs: ['teste1', 'teste2', 'teste3']
    })

    const repositorie = response.data;
    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    const repIndex = repositories.findIndex(repositorie => repositorie.id === id)
    await api.delete(`repositories/${id}`).then(({ status }) => {
      if (status === 204) {
        repositories.splice(repIndex, 1);
        setRepositories([...repositories])
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
        </button></li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
