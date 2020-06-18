import React from 'react';
import gql from 'graphql-tag';
import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import { useQuery } from 'react-apollo';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_REPOSITORIES_OF_CURRENT_USER,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === 4) return 'Refetching!';
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <RepositoryList
      loading={loading}
      repositories={data.viewer.repositories}
      fetchMore={fetchMore}
      entry={'viewer'}
    />
  );
};

export default Profile;
