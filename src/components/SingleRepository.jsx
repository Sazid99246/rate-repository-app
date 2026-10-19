
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 15,
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text style={styles.message}>Error loading repository.</Text>;
  }

  if (!repository) {
    return <Text style={styles.message}>Repository not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <RepositoryItem
        repository={repository}
        showGitHubButton
      />
    </View>
  );
};

export default SingleRepository;
