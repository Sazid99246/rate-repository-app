import { View, Text, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => navigate('/')}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>

      <Pressable style={styles.tab} onPress={() => navigate('/signin')}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
