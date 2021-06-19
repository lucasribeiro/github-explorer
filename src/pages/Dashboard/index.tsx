/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { FormEvent, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logoimg from '../../assests/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

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
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  });

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
          <Link key={repo.full_name} to={`repositories/${repo.full_name}`}>
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
          />
          <div>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
