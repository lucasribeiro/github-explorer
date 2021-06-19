/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assests/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [respository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssue] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssue(response.data);
    });

  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      { respository && (
        <RepositoryInfo>
        <header>
          <img
            src={respository.owner.avatar_url}
            alt={respository.owner.login}
          />
          <div>
            <strong>{respository.full_name}</strong>
            <p>{respository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{respository.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{respository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{respository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url} target="blank">
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
