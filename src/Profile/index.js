import React from 'react';
import gql from 'graphql-tag';
import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import { graphql } from 'react-apollo';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Profile = ({ data, loading, error }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }
  const { viewer } = data;
  if (loading || !viewer) {
    return <Loading />;
  }
  return <RepositoryList repositories={viewer.repositories} />;
};

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
