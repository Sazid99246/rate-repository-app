import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigate } from 'react-router-native';

import TextInput from './TextInput';

const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

const validationSchema = yup.object({
  ownerName: yup
    .string()
    .required('Repository owner is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot exceed 100'),
  text: yup.string(),
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview, { loading }] = useMutation(CREATE_REVIEW);

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createReview({
          variables: {
            review: {
              ownerName: values.ownerName.trim(),
              repositoryName: values.repositoryName.trim(),
              rating: Number(values.rating),
              text: values.text,
            },
          },
        });

        const repositoryId =
          response.data.createReview.repositoryId;

        navigate(`/repositories/${repositoryId}`);
      } catch (error) {
        console.error('Failed to create review:', error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        error={formik.touched.ownerName && formik.errors.ownerName}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        error={
          formik.touched.repositoryName &&
          formik.errors.repositoryName
        }
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Rating (0–100)"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        error={formik.touched.rating && formik.errors.rating}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Review (optional)"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Create a review</Text>
        )}
      </Pressable>
    </View>
  );
};

export default CreateReview;
