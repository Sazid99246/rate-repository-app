
import { gql } from '@apollo/client';
import { useMutation, useApolloClient } from '@apollo/client/react';
import useAuthStorage from './useAuthStorage';

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    const accessToken = response.data.authenticate.accessToken;

    await authStorage.setAccessToken(accessToken);
    await apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
