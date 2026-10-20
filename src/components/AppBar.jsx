
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useNavigate } from 'react-router-native';
import { gql } from '@apollo/client';
import { useQuery, useApolloClient } from '@apollo/client/react';

import useAuthStorage from '../hooks/useAuthStorage';

const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => navigate('/')}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>

      {data?.me ? (
        <>
          <Pressable
            style={styles.tab}
            onPress={() => navigate('/myreviews')}
          >
            <Text style={styles.text}>My reviews</Text>
          </Pressable>

          <Pressable
            style={styles.tab}
            onPress={() => navigate('/createreview')}
          >
            <Text style={styles.text}>Create a review</Text>
          </Pressable>

          <Pressable style={styles.tab} onPress={signOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={styles.tab}
            onPress={() => navigate('/signin')}
          >
            <Text style={styles.text}>Sign in</Text>
          </Pressable>

          <Pressable
            style={styles.tab}
            onPress={() => navigate('/signup')}
          >
            <Text style={styles.text}>Sign up</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AppBar;
