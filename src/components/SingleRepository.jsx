
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  message: {
    padding: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();

  const {
    repository,
    loading,
    error,
    fetchMore,
    pageInfo,
  } = useRepository(id);

  if (loading && !repository) {
    return <ActivityIndicator />;
  }

  if (error && !repository) {
    return (
      <Text style={styles.message}>
        Error loading repository.
      </Text>
    );
  }

  if (!repository) {
    return (
      <Text style={styles.message}>
        Repository not found.
      </Text>
    );
  }

  const reviews = repository.reviews.edges.map(
    (edge) => edge.node
  );

  const onEndReach = () => {
    if (!pageInfo?.hasNextPage || loading) {
      return;
    }

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} />
        )}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <RepositoryItem
            repository={repository}
            showGitHubButton
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator /> : null
        }
      />
    </View>
  );
};

export default SingleRepository;
