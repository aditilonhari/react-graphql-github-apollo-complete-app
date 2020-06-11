import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import RepositoryList from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

function Profile() {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_OF_CURRENT_USER);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (data) {
    const { viewer } = data;
    return <RepositoryList repositories={viewer.repositories} />;
  }
}

export default Profile;
