
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 12,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  githubButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count < 1000) {
    return count.toString();
  }

  return `${(count / 1000).toFixed(1)}k`;
};

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <Image
        style={styles.avatar}
        source={{ uri: repository.ownerAvatarUrl }}
      />

      <View style={styles.content}>
        <Text style={styles.fullName}>{repository.fullName}</Text>

        <Text style={styles.description}>
          {repository.description}
        </Text>

        <Text style={styles.language}>{repository.language}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {formatCount(repository.stargazersCount)}
            </Text>
            <Text>Stars</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {formatCount(repository.forksCount)}
            </Text>
            <Text>Forks</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {repository.reviewCount}
            </Text>
            <Text>Reviews</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {repository.ratingAverage}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>

        {showGitHubButton && (
          <Pressable
            style={styles.githubButton}
            onPress={openGitHub}
            accessibilityRole="button"
          >
            <Text style={styles.githubButtonText}>
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default RepositoryItem;
