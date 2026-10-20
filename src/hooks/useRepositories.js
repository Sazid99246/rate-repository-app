
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int!
    $after: String
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          name
          ownerName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const useRepositories = (
  orderBy = 'CREATED_AT',
  orderDirection = 'DESC',
  searchKeyword = '',
) => {
  const variables = {
    first: 5,
    orderBy,
    orderDirection,
    searchKeyword: searchKeyword.trim(),
  };

  const {
    data,
    loading,
    fetchMore: apolloFetchMore,
    ...result
  } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const pageInfo = data?.repositories?.pageInfo;

    if (loading || !pageInfo?.hasNextPage) {
      return;
    }

    apolloFetchMore({
      variables: {
        ...variables,
        after: pageInfo.endCursor,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
