
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#e1e4e8',
  },
  searchInput: {
    height: 48,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#c5cbd3',
    borderRadius: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 55,
    width: '100%',
    backgroundColor: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const sortingOptions = [
  {
    label: 'Latest repositories',
    value: 'latest',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    label: 'Highest rated repositories',
    value: 'highest',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    label: 'Lowest rated repositories',
    value: 'lowest',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];

export const RepositoryListContainer = ({
  repositories,
  onEndReached,
  onRepositoryPress,
  sortOption,
  onSortChange,
  searchKeyword,
  onSearchChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories..."
            value={searchKeyword}
            onChangeText={onSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Picker
            style={styles.picker}
            selectedValue={sortOption}
            onValueChange={onSortChange}
          >
            {sortingOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={{ fontSize: 18 }}
              />
            ))}
          </Picker>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress?.(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const navigate = useNavigate();

  const selectedOption = sortingOptions.find(
    (option) => option.value === sortOption,
  );


  const { repositories, fetchMore } = useRepositories(
    selectedOption.orderBy,
    selectedOption.orderDirection,
    debouncedSearchKeyword,
  );

  const onRepositoryPress = (id) => {
    navigate(`/repositories/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={onRepositoryPress}
      sortOption={sortOption}
      onSortChange={setSortOption}
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
      onEndReached={() => console.log('End of the list reached')}
    />
  );
};

export default RepositoryList;
