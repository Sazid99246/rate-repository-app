import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigate } from 'react-router-native';

const GET_CURRENT_USER_REVIEWS = gql`
  query {
    me {
      id
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;


const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;


const formatDate = (date) => {
  if (!date) return '';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '';

  return parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const ReviewItem = ({ review, onViewRepository, onDelete }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.repositoryName}>
          {review.repository.fullName}
        </Text>

        <Text style={styles.date}>
          {formatDate(review.createdAt)}
        </Text>

        <Text style={styles.reviewText}>{review.text}</Text>

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, styles.viewButton]}
            onPress={onViewRepository}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(
    GET_CURRENT_USER_REVIEWS,
  );

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const reviews =
    data?.me?.reviews?.edges?.map((edge) => edge.node) ?? [];


  const confirmDelete = (review) => {
    const deleteConfirmed = async () => {
        try {
        await deleteReview({
            variables: { id: review.id },
        });

        await refetch();
        } catch (error) {
        console.error('Failed to delete review:', error);

        if (Platform.OS === 'web') {
            window.alert('Could not delete the review. Please try again.');
        } else {
            Alert.alert(
            'Error',
            'Could not delete the review. Please try again.'
            );
        }
        }
    };

    if (Platform.OS === 'web') {
        if (
        window.confirm(
            'Are you sure you want to delete this review?'
        )
        ) {
        deleteConfirmed();
        }

        return;
    }

    Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Delete',
            style: 'destructive',
            onPress: deleteConfirmed,
        },
        ],
        { cancelable: true }
    );
    };


  if (loading) {
    return <Text style={styles.message}>Loading reviews...</Text>;
  }

  if (error) {
    return (
      <Text style={styles.message}>
        Could not load reviews: {error.message}
      </Text>
    );
  }

  if (!data?.me) {
    return (
      <Text style={styles.message}>
        Please sign in to see your reviews.
      </Text>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={() =>
            navigate(`/repositories/${item.repository.id}`)
          }
          onDelete={() => confirmDelete(item)}
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      contentContainerStyle={
        reviews.length === 0 && styles.emptyContainer
      }
      ListEmptyComponent={
        <Text style={styles.message}>
          You have not written any reviews yet.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  ratingBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  ratingText: {
    color: '#0366d6',
    fontSize: 17,
    fontWeight: '700',
  },
  reviewContent: {
    flex: 1,
  },
  repositoryName: {
    color: '#24292e',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    color: '#586069',
    fontSize: 12,
    marginBottom: 8,
  },
  reviewText: {
    color: '#24292e',
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a49',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#e1e4e8',
    marginLeft: 16,
  },
  message: {
    padding: 20,
    color: '#586069',
    fontSize: 14,
  },
  emptyContainer: {
    flexGrow: 1,
  },
});

export default MyReviews;
