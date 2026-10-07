import { View, Text, StyleSheet, Image } from 'react-native';

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
});

const formatCount = (count) => {
  if (count < 1000) {
    return count.toString();
  }

  return `${(count / 1000).toFixed(1)}k`;
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
};

export default RepositoryItem;
