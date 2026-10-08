import {
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: 'white',
  },
  error: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
  },
});

interface TextInputProps extends RNTextInputProps {
  error?: string;
}

const TextInput = ({ error, ...props }: TextInputProps) => {
  return (
    <>
      <NativeTextInput
        style={[styles.input, error && styles.error]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default TextInput;
