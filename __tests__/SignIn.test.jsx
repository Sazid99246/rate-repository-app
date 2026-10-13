
import { describe, it, expect, jest } from '@jest/globals';
import * as ReactNativeTestingLibrary from '@testing-library/react-native';

import { SignInContainer } from '../src/components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } =
        await ReactNativeTestingLibrary.render(
          <SignInContainer onSubmit={onSubmit} />
        );

      await ReactNativeTestingLibrary.fireEvent.changeText(
        getByPlaceholderText('Username'),
        'testuser'
      );

      await ReactNativeTestingLibrary.fireEvent.changeText(
        getByPlaceholderText('Password'),
        'password123'
      );

      await ReactNativeTestingLibrary.fireEvent.press(
        getByText('Sign in')
      );

      await ReactNativeTestingLibrary.waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'testuser',
          password: 'password123',
        });
      });
    });
  });
});
