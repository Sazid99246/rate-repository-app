import { describe, it, expect } from '@jest/globals';
import * as ReactNativeTestingLibrary from '@testing-library/react-native';

import { RepositoryListContainer } from '../src/components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };


      const renderResult = await ReactNativeTestingLibrary.render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = await renderResult.findAllByTestId('repositoryItem');

      expect(repositoryItems).toHaveLength(2);

      // First repository
      const firstRepository = ReactNativeTestingLibrary.within(
        repositoryItems[0]
      );

      expect(
        firstRepository.getByText('jaredpalmer/formik')
      ).toBeTruthy();
      expect(
        firstRepository.getByText(
          'Build forms in React, without the tears'
        )
      ).toBeTruthy();
      expect(firstRepository.getByText('TypeScript')).toBeTruthy();
      expect(firstRepository.getByText('21.9k')).toBeTruthy();
      expect(firstRepository.getByText('1.6k')).toBeTruthy();
      expect(firstRepository.getByText('88')).toBeTruthy();
      expect(firstRepository.getByText('3')).toBeTruthy();

      // Second repository
      const secondRepository = ReactNativeTestingLibrary.within(
        repositoryItems[1]
      );

      expect(
        secondRepository.getByText('async-library/react-async')
      ).toBeTruthy();
      expect(
        secondRepository.getByText(
          'Flexible promise-based React data loader'
        )
      ).toBeTruthy();
      expect(secondRepository.getByText('JavaScript')).toBeTruthy();
      expect(secondRepository.getByText('1.8k')).toBeTruthy();
      expect(secondRepository.getByText('69')).toBeTruthy();
      expect(secondRepository.getByText('72')).toBeTruthy();
      expect(secondRepository.getByText('3')).toBeTruthy();
    });
  });
});
