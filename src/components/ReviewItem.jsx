import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: '#666',
    marginBottom: 10,
  },
  text: {
    lineHeight: 20,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.username}>
          {review.user.username}
        </Text>

        <Text style={styles.date}>
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>

        <Text style={styles.text}>
          {review.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;
