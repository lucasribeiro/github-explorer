import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoimg from '../../assests/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoimg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/11708545?v=4"
            alt="Lucas Luis Ribeiro"
          />
          <div>
            <strong>Repositório Lucas</strong>
            <p>Teste de listagem de repositório</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/11708545?v=4"
            alt="Lucas Luis Ribeiro"
          />
          <div>
            <strong>Repositório Lucas</strong>
            <p>Teste de listagem de repositório</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/11708545?v=4"
            alt="Lucas Luis Ribeiro"
          />
          <div>
            <strong>Repositório Lucas</strong>
            <p>Teste de listagem de repositório</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
