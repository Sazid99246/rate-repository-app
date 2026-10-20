import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_REPOSITORY = gql`
  query Repository(
    $repositoryId: ID!
    $first: Int!
    $after: String
  ) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const useRepository = (id) => {
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
      first: 5,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore,
    pageInfo: data?.repository?.reviews?.pageInfo,
  };
};

export default useRepository;
