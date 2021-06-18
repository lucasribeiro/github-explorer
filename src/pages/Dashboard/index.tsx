/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import logoimg from '../../assests/logo.svg';

import { Title, Form, Repositories, Error } from './styles';
import Repository from '../Repository';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setinputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setinputError('Digito o autor/nome do repositório');
      return;
    }

    try{
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const respository =  response.data;

      setRepositories([...repositories, respository]);
      setNewRepo('');
      setinputError('');
    }
    catch (err){
      setinputError('Erro na busca por este repositório');
    }

  }

  return (
    <>
      <img src={logoimg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repo => (
          <a key={repo.full_name} href="teste">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
          />
          <div>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
