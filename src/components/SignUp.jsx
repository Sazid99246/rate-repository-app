
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigate } from 'react-router-native';

import TextInput from './TextInput';
import useSignIn from '../hooks/useSignIn';

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username cannot exceed 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot exceed 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
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
  errorText: {
    color: '#d73a4a',
  },
});

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError('');

      try {
        await createUser({
          variables: {
            user: {
              username: values.username.trim(),
              password: values.password,
            },
          },
        });

        await signIn({
          username: values.username.trim(),
          password: values.password,
        });

        navigate('/');
      } catch (error) {
        setServerError(
          error.message || 'Unable to create your account.',
        );
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        error={formik.touched.username && formik.errors.username}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        error={formik.touched.password && formik.errors.password}
      />

      <TextInput
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        error={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
      />

      {serverError ? (
        <Text style={styles.errorText}>{serverError}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </Pressable>
    </View>
  );
};

export default SignUp;
